import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { hash } from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const userExists = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return NextResponse.json(
        { user: null, mesage: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    const { password: tempPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
