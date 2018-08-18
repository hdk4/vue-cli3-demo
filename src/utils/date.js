
export function genDate(n = 0) {
  const now = Date.now();
  const dest = now + 24 * 60 * 60 * 1000 * n;
  const retDate = new Date(dest);
  retDate.setMilliseconds(0)
  retDate.setHours(0)
  retDate.setMinutes(0)
  retDate.setSeconds(0)
  return retDate;
}

export function genDate2(n = 0) {
  const now = Date.now();
  const dest = now + 24 * 60 * 60 * 1000 * n;
  const retDate = new Date(dest);
  retDate.setMilliseconds(999)
  retDate.setHours(23)
  retDate.setMinutes(59)
  retDate.setSeconds(59)
  return retDate;
}
