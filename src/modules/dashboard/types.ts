export type Category = "work" | "personal" | "home";

export type CategoryFilter = Category | "all";

export interface DailyTaskItem {
  id: string;
  text: string;
  done: boolean;
  category: Category;
}

export interface DailyState {
  date: string; // yyyy-mm-dd
  jiraLogged: boolean;
  nytGamesDone: boolean;
  tasks: DailyTaskItem[];
}

export type WeeklyCadenceDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface WeeklyTaskDef {
  id: string;
  label: string;
  category: Category;
  // Specific day(s) this task is tied to. Empty array = any day this week.
  days: WeeklyCadenceDay[];
}

export type ProjectStatus = "not-started" | "in-progress" | "done";

export interface ProjectTask {
  id: string;
  text: string;
  done: boolean;
}

export interface HomeProject {
  id: string;
  title: string;
  notes: string;
  status: ProjectStatus;
  category: Category;
  createdAt: string;
  tasks: ProjectTask[];
}

export interface BiweeklyReminderDef {
  id: string;
  label: string;
  // A Friday (or any anchor date) this cadence is calculated from, yyyy-mm-dd.
  anchorDate: string;
  intervalDays: number;
  category: Category;
}
