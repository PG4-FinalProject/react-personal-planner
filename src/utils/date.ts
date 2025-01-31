// src/utils/date.ts
export const formatDate = (date: Date): string => {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const kstHours = (hours + 9) % 24; // UTC를 KST로 변환 (UTC + 9)
  return `${String(kstHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// KST 기준으로 날짜를 반환하는 헬퍼 함수
export const toKST = (date: Date): Date => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};
