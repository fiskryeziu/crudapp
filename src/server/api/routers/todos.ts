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

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.todo.findMany();
    }),

    createTodo: protectedProcedure
        .input(
            z.object({
                text: z.string()
            }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user.id
            const todos = await ctx.prisma.todo.create({
                data: {
                    title: 'hello',
                    userId,
                },
            })
            return todos

        }),

});
