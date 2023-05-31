import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany();
    }),

    createTodo: protectedProcedure.input(z.object({ text: z.string().min(2) })).mutation(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id
        const todos = await ctx.prisma.todo.create({
            data: {
                userId,
                title: input.text,
            },
        })

        return todos
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
