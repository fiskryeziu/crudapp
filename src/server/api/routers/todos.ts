import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { Prisma } from '@prisma/client';
import { isGreaterThan24Hours } from "~/server/helpers/dateChecker";



export const todoRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({
        sort: z.string()
    })).query(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id;
        console.log(input);



        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId,
                OR: [
                    {
                        specificDate: {
                            lte: new Date(),
                        },
                    },
                    {
                        repeat: 'DAILY',
                    },
                ],
            },
            orderBy: [
                {
                    startDate: input.sort as Prisma.SortOrder
                }
            ]
        });

        const toDelete = todos.some(todo => todo.completed === true
            && todo.repeat === 'NEXT_MONTH'
            || todo.repeat === 'NEXT_WEEK'
            || todo.repeat === 'NONE')

        if (toDelete) {
            const today = new Date()
            await ctx.prisma.todo.deleteMany({
                where: {
                    OR: [
                        {
                            userId,
                            completed: true,
                            repeat: 'NEXT_MONTH',
                        },
                        {
                            userId,
                            completed: true,
                            repeat: 'NEXT_WEEK',
                        },
                        {
                            userId,
                            completed: true,
                            repeat: 'NONE',
                        },
                        {
                            userId,
                            completed: false,
                            specificDate: {
                                lt: today
                            }
                        }

                    ]
                }
            })
        }

        const today = new Date()
        const todayTodos = todos.filter(todo => todo.specificDate ? todo.specificDate.getDate() === today.getDate() : true)


        const updatedTodos = await Promise.all(
            todayTodos.map(async (todo) => {
                const today = new Date();
                if (todo.completedAt) {
                    if (todo.repeat === 'DAILY' && isGreaterThan24Hours(todo.completedAt, today)) {
                        await ctx.prisma.todo.update({
                            where: { id: todo.id },
                            data: { completed: false, completedAt: null },
                        });
                        return { ...todo, completed: false };
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
                repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH', 'NONE']),
                specificDate: z.date().optional()
            }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user.id
            const todos = await ctx.prisma.todo.create({
                data: {
                    startDate: input.startDate,
                    title: input.text,
                    userId,
                    description: input.description,
                    repeat: input.repeat,
                    specificDate: input.specificDate

                },
            })
            return todos

        }),


    editTodo: protectedProcedure
        .input(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH', 'NONE']),
            specificDate: z.date().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    description: input.description,
                    repeat: input.repeat,
                    specificDate: input.specificDate
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


        }),

    upcomingTodos: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;


        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId,
                specificDate: {
                    gt: new Date()
                }
            },
        });

        return todos

    })

});
