import React from 'react';
import type { CalendarDate } from '../../types/calendar';
import type { Schedule } from '../../types/schedule';

interface CalendarGridProps {
  days: CalendarDate[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  schedules: Schedule[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  selectedDate,
  onSelectDate,
  schedules,
}) => {
  const isSelectedDate = (date: Date) =>
    selectedDate.getDate() === date.getDate() &&
    selectedDate.getMonth() === date.getMonth() &&
    selectedDate.getFullYear() === date.getFullYear();

  const getScheduleCount = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return schedules.filter(schedule => schedule.date === dateString).length;
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center py-2 font-medium ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((dayInfo, index) => {
          const isSelected = isSelectedDate(dayInfo.date);
          const scheduleCount = getScheduleCount(dayInfo.date);

          return (
            <button
              key={index}
              onClick={() => onSelectDate(dayInfo.date)}
              className={`
                p-2 h-20 border rounded relative
                ${!dayInfo.isCurrentMonth ? 'text-gray-400' : ''}
                ${isSelected ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}
              `}
            >
              <span
                className={`
                  ${index % 7 === 0 ? 'text-red-500' : ''}
                  ${index % 7 === 6 ? 'text-blue-500' : ''}
                `}
              >
                {dayInfo.date.getDate()}
              </span>
              {scheduleCount > 0 && (
                <div className="absolute bottom-1 right-1">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {scheduleCount}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
