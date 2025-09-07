import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}

interface CalendarProps {
  todos: Todo[];
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ todos, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 获取当前月份的所有日期
  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  // 获取某一天的待办事项
  const getTodosForDate = (date: Date) => {
    return todos.filter((todo) => isSameDay(new Date(todo.dueDate), date));
  };

  // 获取日期的样式类
  const getDateClasses = (date: Date) => {
    const isSelected = isSameDay(date, selectedDate);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const hasTodos = getTodosForDate(date).length > 0;

    return `
      relative w-full h-24 border border-gray-200 p-2 cursor-pointer
      ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
      ${isSelected ? 'ring-2 ring-indigo-600' : ''}
      hover:bg-gray-50
    `;
  };

  // 处理月份切换
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="w-full">
      {/* 日历头部 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'yyyy年 MM月', { locale: zhCN })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-px mb-2">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-semibold text-gray-900"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历格子 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((date) => {
          const dayTodos = getTodosForDate(date);
          return (
            <div
              key={date.toISOString()}
              className={getDateClasses(date)}
              onClick={() => onDateSelect(date)}
            >
              <div className="flex justify-between">
                <span className="text-sm">
                  {format(date, 'd', { locale: zhCN })}
                </span>
                {dayTodos.length > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded-full">
                    {dayTodos.length}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-1">
                {dayTodos.slice(0, 2).map((todo) => (
                  <div
                    key={todo.id}
                    className={`text-xs truncate ${
                      todo.isCompleted ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.title}
                  </div>
                ))}
                {dayTodos.length > 2 && (
                  <div className="text-xs text-gray-500">
                    还有 {dayTodos.length - 2} 项...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
