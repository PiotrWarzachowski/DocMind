import { db } from "@/db";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
const dashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const user = session?.user;

  if (!user || !user.email || !session) {
    redirect("/auth/signin");
  }
  console.log(user);
  const dbUser = await db.user.findFirst({
    where: {
      email: user.email,
    },
  });
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <Dashboard />;
};

export default dashboardPage;
