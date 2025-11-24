export function roundValueOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export function roundValue(value: number) {
  return Math.round(value * 1) / 1;
}

export function formatDateDay(date: string) {
  return date.split(" ")[0];
}

export function formatDateHour(date: string): string {
  const fecha = new Date(date);
  const horas = fecha.getHours();

  const ampm = horas >= 12 ? "PM" : "AM";
  const horas12 = horas % 12 || 12;

  return `${horas12} ${ampm}`;
}
