import React, { useState } from 'react';
import EditTodoForm from './EditTodoForm';

interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: number, updatedTodo: {
    title: string;
    description?: string;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
  }) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, onEdit }) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const handleSaveEdit = (id: number, updatedTodo: {
    title: string;
    description?: string;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
  }) => {
    onEdit(id, updatedTodo);
    setEditingTodoId(null);
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 rounded-lg shadow ${
            todo.isCompleted ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          {editingTodoId === todo.id ? (
            <EditTodoForm
              todo={todo}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => onToggleComplete(todo.id.toString())}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-gray-600 text-sm">{todo.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {todo.dueDate && (
                  <span className="text-sm text-gray-500">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    todo.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : todo.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {todo.priority}
                </span>
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  编辑
                </button>
                <button
                  onClick={() => onDelete(todo.id.toString())}
                  className="text-red-600 hover:text-red-800"
                >
                  删除
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;