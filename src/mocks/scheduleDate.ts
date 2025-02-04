// src/mocks/scheduleData.ts
import type { Schedule } from '../types/schedule';

export const mockSchedules: Schedule[] = [
  {
    id: 1,
    title: '팀 미팅',
    startTime: '09:00',
    endTime: '10:30',
    date: '2025-01-14',
    category: 'meeting',
    description: '프로젝트 진행 상황 공유',
  },
  {
    id: 2,
    title: '점심 약속',
    startTime: '13:00',
    endTime: '13:59',
    date: '2025-02-04',
    category: 'personal',
  },
  {
    id: 3,
    title: '운동',
    startTime: '17:00',
    endTime: '19:30',
    date: '2025-02-04',
    category: 'health',
  },
  {
    id: 4,
    title: '발표 준비',
    startTime: '14:00',
    endTime: '16:00',
    date: '2025-01-16',
    category: 'work',
    description: '다음 주 발표 자료 준비',
  },
  {
    id: 5,
    title: '디자인 회의',
    startTime: '11:00',
    endTime: '12:00',
    date: '2025-01-31',
    category: 'meeting',
    description: 'UI/UX 디자인 리뷰',
  },
];
