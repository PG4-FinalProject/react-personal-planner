// styles/calendar.styles.ts
import styled from 'styled-components';
import { palette } from './palette';

export const CalendarContainer = styled.div`
  max-width: 48rem;
  margin: 16px;
  background-color: ${palette.white};
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarSection = styled.div`
  border-radius: 1rem;
  background-color: ${palette.white};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  //   border: 1px solid ${palette.gray};
`;

export const HeaderWrapper = styled.div`
  padding: 1.5rem;
  padding-bottom: 1rem;
`;

export const GridWrapper = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

// Header Styles
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MonthTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -0.025em;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Grid Styles
export const DayHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
`;

export const DayHeader = styled.div<{ isWeekend?: boolean }>`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props =>
    props.isWeekend === true
      ? palette.blue
      : props.isWeekend === false
        ? palette.red
        : palette.gray};
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

export const DayCell = styled.button<{
  isSelected?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isSunday?: boolean;
  isSaturday?: boolean;
}>`
  position: relative;
  height: 4rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  border: ${props =>
    props.isSelected
      ? `2px solid ${palette.blue}`
      : props.isToday
        ? `1px solid ${palette.blue}`
        : '1px solid transparent'};
  background-color: ${props =>
    props.isSelected ? palette.blue : 'transparent'};

  &:hover {
    background-color: ${props =>
      props.isSelected ? palette.blue : palette.lightgray};
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props =>
      !props.isCurrentMonth
        ? palette.gray
        : props.isSunday
          ? palette.red
          : props.isSaturday
            ? palette.blue
            : palette.gray};
  }
`;

export const ScheduleBadge = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
`;

export const BadgeCounter = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #3b82f6;
  border-radius: 9999px;
`;

// Schedule List Styles
export const ScheduleListSection = styled(CalendarSection)`
  margin-top: 1.5rem;
  padding: 1.5rem;
`;

export const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const ScheduleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${palette.gray};
`;

export const AddScheduleButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.white};
  background-color: ${palette.blue};
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ScheduleItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${palette.lightgray};
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${palette.lightgray};
  }
`;

export const ScheduleItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ScheduleInfo = styled.div`
  flex: 1;
`;

export const ScheduleItemTitle = styled.h4`
  font-weight: 500;
  color: ${palette.gray};
`;

export const ScheduleTime = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${palette.gray};
`;

export const ScheduleDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${palette.gray};
`;
