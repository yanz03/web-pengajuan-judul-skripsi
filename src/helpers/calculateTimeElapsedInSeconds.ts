export function calculateTimeElapsedInSeconds(date: string): number {
  const currentDate = new Date();
  const targetDate = new Date(date);
  return Math.floor((targetDate.getTime() - currentDate.getTime()) / 1000);
}
