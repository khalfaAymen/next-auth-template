import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Step 1: Receive request body and extract values
    const body = await request.json();
    const { name, email, password, confirmPassword, username } = body;
    console.log(password,confirmPassword);
    
    // Step 2: Validate name (only letters and spaces, minimum 3 characters)
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        {
          message:
            "Name must contain only letters and spaces, minimum 3 characters.",
        },
        { status: 400 }
      );
    }

    // Step 3: Validate email (correct email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Step 4: Validate password (regex for strong password)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
        },
        { status: 400 }
      );
    }

    // Step 5: Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Step 6: Check if user already exists by email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists." },
        { status: 409 }
      );
    }

    // Step 7: Hash the password before storing it in the database
    const hashedPassword = await hash(password, 12);

    // Step 8: Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    // Step 9: Remove password from the user data before returning it in response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...rest } = newUser;

    // Step 10: Return success response with user data (excluding password)
    return NextResponse.json(
      { user: rest, message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return a generic server error message
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
