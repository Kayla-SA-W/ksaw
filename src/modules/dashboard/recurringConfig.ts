import { BiweeklyReminderDef, Category, WeeklyTaskDef } from "./types";

export interface DailyRecurringDef {
  id: string;
  label: string;
  category: Category;
  optional?: boolean;
}

// Fixed recurring items that show up every single day.
export const DAILY_RECURRING: DailyRecurringDef[] = [
  { id: "jira-hours", label: "Log Jira hours", category: "work" },
  { id: "nyt-games", label: "NYT Games (30-45 min)", category: "personal", optional: true }
];

// Recurring items tracked once per calendar week (Mon-Sun).
// days: [] means "any day this week" (no fixed day).
export const WEEKLY_RECURRING: WeeklyTaskDef[] = [
  { id: "lattice-trainings", label: "Check Lattice for trainings", category: "work", days: [] },
  { id: "nyt-crossword", label: "NYT Crossword", category: "personal", days: ["Mon"] },
  { id: "spot-awards", label: "Nominate for Spot Awards", category: "work", days: ["Thu"] },
  {
    id: "noon-nonsense-wed",
    label: "Noon Nonsense: move used question, add a new one",
    category: "work",
    days: ["Wed"]
  },
  {
    id: "noon-nonsense-fri",
    label: "Noon Nonsense: move used question, add a new one",
    category: "work",
    days: ["Fri"]
  }
];

// Biweekly reminders anchored to real calendar dates. The anchor dates below
// are both Fridays: submitting starts 2026-09-25, starting a new timesheet
// starts the following Friday, 2026-10-02 - each then repeats every 14 days.
export const BIWEEKLY_REMINDERS: BiweeklyReminderDef[] = [
  { id: "timesheet-start", label: "Start new timesheet", anchorDate: "2026-10-02", intervalDays: 14, category: "work" },
  { id: "timesheet-submit", label: "Submit timesheet", anchorDate: "2026-09-25", intervalDays: 14, category: "work" }
];
