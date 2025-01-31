// src/types/calendar.ts
export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
}

export interface Todo {
  id: number;
  date: string;
  title: string;
  completed: boolean;
}

// 추가적으로 필요한 타입들도 여기에 정의할 수 있습니다.
export interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export interface TodoListProps {
  date: Date;
  todos: Todo[];
  onTodoToggle: (id: number) => void;
}
