import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user: user,
    },
  });
});

export const router = t.router;
export const privateProcedure = t.procedure.use(isAuth);
export const publicProcedure = t.procedure;
