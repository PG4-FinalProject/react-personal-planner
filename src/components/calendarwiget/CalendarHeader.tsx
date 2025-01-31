import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">
      {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
    </h2>
    <div className="flex gap-4">
      <button onClick={onPrevMonth} className="p-2 hover:bg-gray-100 rounded">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 rounded">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);
