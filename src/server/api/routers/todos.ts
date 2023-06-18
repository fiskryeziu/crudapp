import { Todo } from "@prisma/client";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId,
            },
        });

        const today = new Date()
        const todayTodos = todos.filter(todo => todo.specificDate ? todo.specificDate.getDate() === today.getDate() : true)

        console.log(todayTodos);

        const updatedTodos = await Promise.all(
            todayTodos.map(async (todo) => {
                if (todo.repeat === 'DAILY') {
                    const today = new Date();
                    if (todo.completedAt !== null && todo.completed) {
                        const completedAt = todo.completedAt
                        if (completedAt < today) {
                            if (completedAt.getDate() < today.getDate()) {
                                console.log(completedAt.getDate());
                                // Update the todo's completed status
                                await ctx.prisma.todo.update({
                                    where: { id: todo.id },
                                    data: { completed: false },
                                });
                                return { ...todo, completed: false };
                            }
                        }
                    }
                }
                return todo;
            })
        );
        const filterTodo = updatedTodos.filter(todo => todo.completed === false)


        return filterTodo

    }),

    createTodo: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                startDate: z.date(),
                description: z.string(),
                repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH']).or(z.null())
            }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user.id
            const todos = await ctx.prisma.todo.create({
                data: {
                    startDate: input.startDate,
                    title: input.text,
                    userId,
                    description: input.description,
                    repeat: input.repeat
                },
            })
            return todos

        }),

    editTodo: protectedProcedure
        .input(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH'])
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    description: input.description,
                    repeat: input.repeat
                }
            })
        }),

    deleteTodo: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.delete({
                where: {
                    id: input.id
                }
            })
        }),

    todoCommpleted: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.update({
                where: { id: input.id },
                data: {
                    completed: true,
                    completedAt: new Date()
                },
            });


        })

});
