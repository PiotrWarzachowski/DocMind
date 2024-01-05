import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";
import { z } from "zod";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { hash } from "bcrypt";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    if (!user || !session) throw new TRPCError({ code: "UNAUTHORIZED" });

    if (!user.email) {
    }
    const dbUser = await db.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (!dbUser) {
      const newUser = await db.user.create({
        data: {
          email: user.email,
          accountType: "GOOGLE",
        },
      });
      return { user: newUser };
    }
    return { success: true };
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId, user } = ctx;

    return await db.file.findMany({
      where: {
        userId: userId,
      },
      include: {
        messages: true,
      },
    });
  }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      });
      if (!file) return { status: "PENDING" as const };

      return { status: file.uploadStatus };
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      return file;
    }),

  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { cursor, fileId } = input;
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId: userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = await db.message.findMany({
        where: {
          fileId: fileId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          text: true,
          isUserMessage: true,
          createdAt: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId: userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
          userId: userId,
        },
      });

      return file;
    }),
});

export type AppRouter = typeof appRouter;
