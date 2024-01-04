import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { hash, compare } from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const userExists = await db.user.findFirst({
      where: {
        email: email,
        accountType: "CLASSIC",
      },
    });
    if (userExists && (await compare(password, userExists.password!))) {
      const { password: tempPassword, ...rest } = userExists;

      return NextResponse.json(
        { user: rest, message: "Logged in succesfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          user: null,
          message: "User not found or  wrong password",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
