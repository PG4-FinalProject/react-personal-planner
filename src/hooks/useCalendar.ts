import { useState } from 'react';

interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
}

interface UseCalendarReturn {
  currentDate: Date;
  selectedDate: Date;
  calendarDays: CalendarDate[];
  prevMonth: () => void;
  nextMonth: () => void;
  setSelectedDate: (date: Date) => void;
}

export const useCalendar = (): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const getCalendarDays = (): CalendarDate[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: CalendarDate[] = [];

    // 이전 달의 날짜들
    for (let i = 0; i < startingDay; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      days.push({
        date: new Date(
          year,
          month - 1,
          prevMonthLastDay - (startingDay - i - 1),
        ),
        isCurrentMonth: false,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - days.length; // 6주 분량
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  return {
    currentDate,
    selectedDate,
    calendarDays: getCalendarDays(),
    prevMonth,
    nextMonth,
    setSelectedDate,
  };
};
