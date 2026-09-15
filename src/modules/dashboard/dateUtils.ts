import { WeeklyCadenceDay } from "./types";

export const toISODate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const todayISO = (): string => toISODate(new Date());

export const parseISODate = (iso: string): Date => {
  const parts = iso.split("-").map(Number);
  const [y, m, d] = parts;
  return new Date(y, m - 1, d);
};

const DAY_LABELS: WeeklyCadenceDay[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const dayLabelOf = (d: Date): WeeklyCadenceDay => DAY_LABELS[d.getDay()];

export const mondayOf = (d: Date): Date => {
  const copy = new Date(d);
  const day = copy.getDay(); // 0 = Sun ... 6 = Sat
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export const weekKeyOf = (d: Date): string => toISODate(mondayOf(d));

export const currentWeekKey = (): string => weekKeyOf(new Date());

export const daysBetween = (a: Date, b: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / msPerDay);
};

export interface OccurrenceInfo {
  date: Date;
  iso: string;
  daysUntil: number; // 0 = today
  isToday: boolean;
}

// Given a recurring cadence anchored on `anchorISO` every `intervalDays` days,
// find the next occurrence on/after `from`.
export const nextOccurrence = (
  anchorISO: string,
  intervalDays: number,
  from: Date = new Date()
): OccurrenceInfo => {
  const anchor = parseISODate(anchorISO);
  const diff = daysBetween(anchor, from);
  let daysUntil: number;
  if (diff < 0) {
    daysUntil = -diff;
  } else {
    const cyclePos = diff % intervalDays;
    daysUntil = cyclePos === 0 ? 0 : intervalDays - cyclePos;
  }
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysUntil);
  return { date, iso: toISODate(date), daysUntil, isToday: daysUntil === 0 };
};

export const formatFriendlyDate = (iso: string): string => {
  const d = parseISODate(iso);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
};
