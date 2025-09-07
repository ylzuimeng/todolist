import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 更新待办事项
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, dueDate, priority, isCompleted } = body;

    const todo = await prisma.todo.update({
      where: {
        id: parseInt(params.id),
        userId: 1, // 临时使用固定用户ID，后续会通过认证获取
      },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        isCompleted,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// 删除待办事项
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(params.id),
        userId: 1, // 临时使用固定用户ID，后续会通过认证获取
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
