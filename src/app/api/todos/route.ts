import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 获取所有待办事项
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: 1, // 临时使用固定用户ID，后续会通过认证获取
      },
      include: {
        lists: {
          include: {
            list: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// 创建新的待办事项
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, dueDate, priority } = body;

    const todo = await prisma.todo.create({
      data: {
        userId: 1, // 临时使用固定用户ID，后续会通过认证获取
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        isCompleted: false,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
