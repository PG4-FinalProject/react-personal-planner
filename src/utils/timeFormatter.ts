export const formatRemainingTime = (
  diffInMilliseconds: number,
): string | null => {
  if (diffInMilliseconds < 0) return null;

  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );

  return hours > 0 ? `${hours}시간 ${minutes}분 후` : `${minutes}분 후`;
};

export const calculateTimeDifference = (startTimeStr: string): number => {
  const startTime = new Date(startTimeStr);
  const currentTime = new Date();
  return startTime.getTime() - currentTime.getTime();
};
