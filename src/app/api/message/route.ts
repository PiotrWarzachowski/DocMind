import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { db } from "@/db";
export const POST = async (req : NextRequest) => { 
    // endpoint for asking a question for a PDF

    const body = await req.json();
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const {fileId, message} = SendMessageValidator.parse(body);

    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId : userId
        }
    });

    if (!file) {
        return new Response("Not found", { status: 404 });
    }

    await db.message.create({ data : {
        text : message,
        isUserMessage : true,
        userId : userId,
        fileId : fileId
    }});

    

};