export function clearIntervalRef(
  intervalIdRef: React.RefObject<number | undefined>
) {
  clearInterval(intervalIdRef.current);
  intervalIdRef.current = undefined;
}
