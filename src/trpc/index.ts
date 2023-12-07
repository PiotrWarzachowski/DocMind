import { TRPCError } from '@trpc/server';
import {privateProcedure, publicProcedure, router } from './trpc';
import { auth, currentUser } from "@clerk/nextjs"
import { db } from '@/db';
import { z } from 'zod';

export const appRouter = router({
    authCallback : publicProcedure.query(async () => {
        const user  = await currentUser();
        const email = user?.emailAddresses[0].emailAddress;

        if (!user || !email) throw new TRPCError({ code: 'UNAUTHORIZED' });
    
        const dbUser = await db.user.findFirst({
            where: { 
                id: user.id,
                email : email 
            },
        });
        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email   : email,
                },
            });
        }
        return {success : true};
    }),

    getUserFiles : privateProcedure.query(async ({ ctx }) => {
        const {userId, user} = ctx;

        return await db.file.findMany({
            where : {
                userId : userId
            }
        });
    }),

    deleteFile : privateProcedure.input(
        z.object({ id : z.string()})).mutation(async ({ ctx, input }) => {
        const {userId} = ctx;
        const file = await db.file.findFirst({
            where : {
                id : input.id,
                userId : userId
            }
        });
        if (!file) throw new TRPCError({ code: 'NOT_FOUND' });
        
        await db.file.delete({
            where : {
                id : input.id,
                userId : userId
            }
        });

        return file;
        
    })


    
});

export type AppRouter = typeof appRouter;