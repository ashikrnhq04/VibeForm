import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dob: Date) {
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  //adjust month in case of negative days value
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  //adjust year in case of negative months value
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// word count
export function wordCount(field: string | undefined) {
  return field?.split(" ").filter((item: string) => item.trim()).length;
}
