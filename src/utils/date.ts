const pad = (n: number) => String(n).padStart(2, '0');

export function fmtDate(d: Date) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function fmtDT(d: Date) {
  return `${fmtDate(d)} - ${pad(d.getHours())}H${pad(d.getMinutes())}`;
}

export function toLocalInput(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function toDateInput(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function rid() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}
