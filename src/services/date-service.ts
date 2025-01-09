import type { Month } from "@/types/date-type.ts";
import { months } from "@/utils/const.ts";

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthNumber = (month: Month) => {
  return months.indexOf(month) + 1;
};

export const getDayNumbers = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const days: string[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d < 10 ? `0${d}` : `${d}`);
  }

  return days;
};
