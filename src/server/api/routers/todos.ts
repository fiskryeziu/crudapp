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

        const toDelete = todos.some(todo => todo.completed === true
            && todo.repeat === 'NEXT_MONTH'
            || todo.repeat === 'NEXT_WEEK'
            || todo.repeat === null)

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
                            repeat: null,
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
                if (todo.repeat === 'DAILY' && todo.completedAt && todo.completedAt.getDate() < today.getDate()) {
                    await ctx.prisma.todo.update({
                        where: { id: todo.id },
                        data: { completed: false },
                    });
                    return { ...todo, completed: false };
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
                repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH']).or(z.null()),
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
            repeat: z.enum(['DAILY', 'NEXT_WEEK', 'NEXT_MONTH']).or(z.null()),
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
