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
        const userId = ctx.session?.user.id
        return await ctx.prisma.todo.findMany({
            where: {
                userId
            }
        });
    }),

    createTodo: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                startDate: z.date()
            }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user.id
            const todos = await ctx.prisma.todo.create({
                data: {
                    startDate: input.startDate,
                    title: input.text,
                    userId,
                },
            })
            return todos

        }),

});
