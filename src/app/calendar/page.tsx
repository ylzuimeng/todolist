'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import { startOfDay, endOfDay, isSameDay } from 'date-fns';

interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}

export default function CalendarPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 获取选中日期的待办事项
  const getSelectedDateTodos = () => {
    return todos.filter((todo) =>
      isSameDay(new Date(todo.dueDate), selectedDate)
    );
  };

  // 添加新的待办事项
  const handleAddTodo = async (newTodo: {
    title: string;
    description?: string;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
  }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTodo,
          dueDate: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const todo = await response.json();
      setTodos([...todos, todo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  // 更新待办事项状态
  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          isCompleted: !todo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(
        todos.map((todo) =>
          todo.id === parseInt(id)
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  // 删除待办事项
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter((todo) => todo.id !== parseInt(id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 日历视图 */}
          <div className="lg:col-span-2">
            <Calendar
              todos={todos}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* 右侧栏 */}
          <div className="space-y-8">
            {/* 添加待办事项表单 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                添加新待办事项
              </h2>
              <AddTodoForm onAdd={handleAddTodo} />
            </div>

            {/* 选中日期的待办事项列表 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedDate.toLocaleDateString()} 的待办事项
              </h2>
              <TodoList
                todos={getSelectedDateTodos()}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={() => {}} // 暂时不实现编辑功能
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
