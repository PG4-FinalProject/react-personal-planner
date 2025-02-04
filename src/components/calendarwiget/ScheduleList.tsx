// src/components/ScheduleList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { formatTime } from '../../utils/date'; // formatTime 추가
import type { Schedule } from '../../types/schedule';

interface ScheduleListProps {
  date: Date;
  schedules: Schedule[];
  isLoading: boolean;
  onEditClick: (schedule: Schedule) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  date,
  schedules,
  isLoading,
  onEditClick,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">
          {date.getMonth() + 1}월 {date.getDate()}일 일정 목록
        </h2>
        <button
          onClick={() => navigate('/plans/create')}
          className="text-blue-500 hover:text-blue-600"
        >
          + 새 일정
        </button>
      </div>

      <div className="space-y-2">
        {schedules.length > 0 ? (
          schedules.map(schedule => (
            <div
              key={schedule.id}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{schedule.title}</h3>
                  <p className="text-sm text-gray-500">
                    {formatTime(schedule.startTime)} -{' '}
                    {formatTime(schedule.endTime)}
                  </p>
                </div>
                <button
                  onClick={() => onEditClick(schedule)}
                  className="p-2 hover:bg-gray-50 rounded-full"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              {schedule.description && (
                <p className="mt-2 text-sm text-gray-600">
                  {schedule.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            예정된 일정이 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
