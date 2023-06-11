import { Todo } from "@prisma/client";
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
        const userId = ctx.session?.user.id;
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId,
            },
        });

        const updatedTodos = await Promise.all(
            todos.map(async (todo) => {
                if (todo.repeat === 'DAILY') {
                    const today = new Date();
                    if (todo.completedAt !== null) {
                        const completedAt = new Date(todo.completedAt.getTime() - 24 * 60 * 60 * 1000);
                        if (completedAt < today) {
                            // Update the todo's completed status
                            await ctx.prisma.todo.update({
                                where: { id: todo.id },
                                data: { completed: false },
                            });
                            return { ...todo, completed: false };
                        }
                    }
                }
                return todo;
            })
        );
        return updatedTodos;
    }),

    createTodo: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                startDate: z.date(),
                description: z.string()
            }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user.id
            const todos = await ctx.prisma.todo.create({
                data: {
                    startDate: input.startDate,
                    title: input.text,
                    userId,
                    description: input.description
                },
            })
            return todos

        }),

});
