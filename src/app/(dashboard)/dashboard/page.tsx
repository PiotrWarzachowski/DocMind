import { db } from "@/db";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
const dashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !session) {
    redirect("/signin");
  }
  console.log(user);
  console.log(user.email);

  if (!user.email) {
    redirect("/signin?error=NoEmail");
  }
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
