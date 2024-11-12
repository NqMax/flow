export function timeToMinutes(time: number) {
  return Math.floor(time / 60);
}

export function timeToSeconds(time: number) {
  return time % 60;
}
