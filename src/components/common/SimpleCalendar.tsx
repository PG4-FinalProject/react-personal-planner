import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { palette } from '../../styles/palette';

const CalendarContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

const WeekdayHeader = styled.div`
  text-align: center;
  font-size: 12px;
  padding: 8px 0;
  color: #666;
`;

const DayCell = styled.button<{
  isSelected?: boolean;
  isToday?: boolean;
  isPreviousMonth?: boolean;
  isNextMonth?: boolean;
}>`
  aspect-ratio: 1;
  border: none;
  background: ${props => (props.isSelected ? palette.blue : 'white')};
  color: ${props => {
    if (props.isSelected) return 'white';
    if (props.isPreviousMonth || props.isNextMonth) return '#ccc';
    return '#333';
  }};
  font-weight: ${props => (props.isToday ? '600' : 'normal')};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${props => (props.isSelected ? palette.blue : '#f5f5f5')};
  }
`;

interface SimpleCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Previous month days
    const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, daysInPreviousMonth - i),
        isPreviousMonth: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isNextMonth: true,
      });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <MonthTitle>
          {currentYear}년 {currentMonth + 1}월
        </MonthTitle>
        <ButtonGroup>
          <IconButton onClick={handlePreviousMonth}>
            <ChevronLeft size={20} />
          </IconButton>
          <IconButton onClick={handleNextMonth}>
            <ChevronRight size={20} />
          </IconButton>
        </ButtonGroup>
      </HeaderContainer>

      <Grid>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}
        {generateDays().map((day, index) => (
          <DayCell
            key={index}
            isSelected={isSelected(day.date)}
            isToday={isToday(day.date)}
            isPreviousMonth={day.isPreviousMonth}
            isNextMonth={day.isNextMonth}
            onClick={() => onDateSelect(day.date)}
          >
            {day.date.getDate()}
          </DayCell>
        ))}
      </Grid>
    </CalendarContainer>
  );
};

export default SimpleCalendar;
