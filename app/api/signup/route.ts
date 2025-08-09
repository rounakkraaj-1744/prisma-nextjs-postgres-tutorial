import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password, framework } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        framework,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  }
  catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
  finally {
    await prisma.$disconnect();
  }
}