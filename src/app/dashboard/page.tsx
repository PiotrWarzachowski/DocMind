import { db } from "@/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { use } from "react";
import Dashboard from "@/components/Dashboard";
const dashboardPage = async () => {
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    
    if (!user?.id || !email) {
        redirect('/auth-callback?origin=dashboard')
    }

    const dbUser = await db.user.findFirst({
        where : {
            id : user.id
        }
    });

  return <Dashboard />
}

export default dashboardPage