// src/components/CalendarWidget.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { useSchedule } from '../../hooks/useSchedule';
import { getDateFormat } from '../../utils/date';
import { useCategory } from '../../hooks/useCategory';
import type { Schedule } from '../../types/schedule';
import {
  CalendarContainer,
  CalendarSection,
  HeaderWrapper,
  GridWrapper,
  HeaderContainer,
  MonthTitle,
  ButtonGroup,
  IconButton,
  DayHeaderGrid,
  DayHeader,
  DayGrid,
  DayCell,
  ScheduleBadge,
  BadgeCounter,
  ScheduleListSection,
  ScheduleHeader,
  ScheduleTitle,
  AddScheduleButton,
  ScheduleList,
  ScheduleItem,
  ScheduleItemHeader,
  ScheduleInfo,
  ScheduleItemTitle,
  ScheduleTime,
  ScheduleDescription,
} from '../../styles/CalendarWiget.styles';

const CalendarWidget: React.FC = () => {
  const navigate = useNavigate();

  const {
    currentDate,
    selectedDate,
    calendarDays,
    prevMonth,
    nextMonth,
    setSelectedDate,
  } = useCalendar();

  const { schedules, getSchedulesByDate, isLoading, deleteSchedule } =
    useSchedule();
  const { categories } = useCategory(); // 추가

  const scheduleCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};

    calendarDays.forEach(dayInfo => {
      const localDate = new Date(dayInfo.date);
      localDate.setHours(0, 0, 0, 0); // 자정으로 설정
      const dateString = getDateFormat(localDate); // 로컬 시간대 기준으로 포맷팅

      counts[dateString] = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        scheduleDate.setHours(0, 0, 0, 0); // 스케줄 날짜도 자정으로 설정
        const scheduleDateString = getDateFormat(scheduleDate); // 로컬 시간대 기준으로 포맷팅
        return scheduleDateString === dateString; // 날짜 비교
      }).length;
    });

    return counts;
  }, [schedules, calendarDays]);

  const selectedDateSchedules = useMemo(
    () => getSchedulesByDate(selectedDate),
    [getSchedulesByDate, selectedDate],
  );

  const handleEditClick = (schedule: Schedule) => {
    navigate('/plans/edit', {
      state: {
        id: schedule.id,
        title: schedule.title,
        detail: schedule.description,
        startTime: `${schedule.date} ${schedule.startTime}`,
        endTime: `${schedule.date} ${schedule.endTime}`,
        categoryId: categories.find(c => c.name === schedule.category)?.id,
      },
    });
  };

  const handleDeleteClick = (schedule: Schedule) => {
    deleteSchedule(schedule.id);
  };

  return (
    <CalendarContainer>
      <CalendarSection>
        <HeaderWrapper>
          <HeaderContainer>
            <MonthTitle>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </MonthTitle>
            <ButtonGroup>
              <IconButton onClick={prevMonth}>
                <ChevronLeft size={20} />
              </IconButton>
              <IconButton onClick={nextMonth}>
                <ChevronRight size={20} />
              </IconButton>
            </ButtonGroup>
          </HeaderContainer>
        </HeaderWrapper>

        <GridWrapper>
          <DayHeaderGrid>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <DayHeader
                key={day}
                isWeekend={index === 0 ? false : index === 6 ? true : undefined}
              >
                {day}
              </DayHeader>
            ))}
          </DayHeaderGrid>

          <DayGrid>
            {calendarDays.map((dayInfo, index) => {
              const isToday =
                dayInfo.date.toDateString() === new Date().toDateString();
              const isSelected =
                selectedDate.getDate() === dayInfo.date.getDate() &&
                selectedDate.getMonth() === dayInfo.date.getMonth() &&
                selectedDate.getFullYear() === dayInfo.date.getFullYear();

              const dateString = getDateFormat(dayInfo.date);
              const scheduleCount = scheduleCounts[dateString] || 0;

              return (
                <DayCell
                  key={index}
                  onClick={() => setSelectedDate(dayInfo.date)}
                  isSelected={isSelected}
                  isToday={isToday}
                  isCurrentMonth={dayInfo.isCurrentMonth}
                  isSunday={index % 7 === 0}
                  isSaturday={index % 7 === 6}
                >
                  <span>{dayInfo.date.getDate()}</span>
                  {scheduleCount > 0 && (
                    <ScheduleBadge>
                      <BadgeCounter>{scheduleCount}</BadgeCounter>
                    </ScheduleBadge>
                  )}
                </DayCell>
              );
            })}
          </DayGrid>
        </GridWrapper>
      </CalendarSection>

      <ScheduleListSection>
        <ScheduleHeader>
          <ScheduleTitle>
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
          </ScheduleTitle>
          <AddScheduleButton
            onClick={() =>
              navigate('/plans/create', {
                state: { selectedDate: getDateFormat(selectedDate) },
              })
            }
          >
            + 새 일정
          </AddScheduleButton>
        </ScheduleHeader>

        <ScheduleList>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ScheduleItem key={i} style={{ opacity: 0.5 }} />
            ))
          ) : selectedDateSchedules.length > 0 ? (
            selectedDateSchedules.map(schedule => (
              <ScheduleItem
                key={schedule.id}
                onClick={() => handleEditClick(schedule)}
              >
                <ScheduleItemHeader>
                  <ScheduleInfo>
                    <ScheduleItemTitle>{schedule.title}</ScheduleItemTitle>
                    <ScheduleTime>
                      {schedule.startTime} - {schedule.endTime}
                    </ScheduleTime>
                  </ScheduleInfo>
                  <IconButton
                    onClick={e => {
                      e.stopPropagation(); // 부모 클릭 이벤트 막기
                      handleDeleteClick(schedule);
                    }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </ScheduleItemHeader>
                {schedule.description && (
                  <ScheduleDescription>
                    {schedule.description}
                  </ScheduleDescription>
                )}
              </ScheduleItem>
            ))
          ) : (
            <div
              style={{ textAlign: 'center', color: '#666', padding: '3rem 0' }}
            >
              예정된 일정이 없습니다
            </div>
          )}
        </ScheduleList>
      </ScheduleListSection>
    </CalendarContainer>
  );
};

export default CalendarWidget;
