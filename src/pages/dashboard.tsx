import React, { useEffect, useState } from "react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import { AuthGate, SignOutButton } from "../components/dashboard/AuthGate";
import { HomeProjectsSection } from "../components/dashboard/HomeProjectsSection";
import { NotesSection } from "../components/dashboard/NotesSection";
import { TimesheetSection } from "../components/dashboard/TimesheetSection";
import { TodaySection } from "../components/dashboard/TodaySection";
import { WeeklySection } from "../components/dashboard/WeeklySection";
import {
  DateLabel,
  FilterBar,
  FilterLabel,
  HeaderRight,
  HeaderRow,
  Inner,
  JumpNav,
  PageWrap,
  TabButton,
  Title
} from "../components/dashboard/styles";
import { formatFriendlyDate, todayISO } from "../modules/dashboard/dateUtils";
import { BIWEEKLY_REMINDERS, WEEKLY_RECURRING } from "../modules/dashboard/recurringConfig";
import { CategoryFilter } from "../modules/dashboard/types";

const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "personal", label: "Personal" },
  { key: "home", label: "Home" }
];

type SectionKey = "today" | "week" | "timesheet" | "projects" | "notes";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "timesheet", label: "Timesheet" },
  { key: "projects", label: "Projects" },
  { key: "notes", label: "Notes" }
];

// Today, Projects, and Notes can always hold user-added items of any
// category, so they stay available no matter which label is selected. Week
// and Timesheet are built from a fixed, hardcoded list of recurring items,
// so we can tell in advance whether a given label has anything in them.
const sectionMatchesFilter = (key: SectionKey, filter: CategoryFilter): boolean => {
  if (filter === "all") return true;
  if (key === "week") return WEEKLY_RECURRING.some((item) => item.category === filter);
  if (key === "timesheet") return BIWEEKLY_REMINDERS.some((item) => item.category === filter);
  return true;
};

const DashboardPage = () => {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [section, setSection] = useState<SectionKey>("today");

  const visibleSections = SECTIONS.filter((s) => sectionMatchesFilter(s.key, filter));

  useEffect(() => {
    if (!visibleSections.some((s) => s.key === section)) {
      setSection("today");
    }
    // Only re-check when the filter (and therefore visibleSections) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <AuthGate>
      <PageWrap>
        <Inner>
          <HeaderRow>
            <Title>Dashboard</Title>
            <HeaderRight>
              <DateLabel>{formatFriendlyDate(todayISO())}</DateLabel>
              <SignOutButton />
            </HeaderRight>
          </HeaderRow>

          <JumpNav>
            {visibleSections.map((s) => (
              <TabButton key={s.key} type="button" $active={section === s.key} onClick={() => setSection(s.key)}>
                {s.label}
              </TabButton>
            ))}
          </JumpNav>

          <FilterBar>
            <FilterLabel>Show:</FilterLabel>
            {FILTERS.map((f) => (
              <TabButton key={f.key} type="button" $active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </TabButton>
            ))}
          </FilterBar>

          {section === "today" && <TodaySection filter={filter} />}
          {section === "week" && <WeeklySection filter={filter} />}
          {section === "timesheet" && <TimesheetSection filter={filter} />}
          {section === "projects" && <HomeProjectsSection filter={filter} />}
          {section === "notes" && <NotesSection />}
        </Inner>
      </PageWrap>
    </AuthGate>
  );
};

export default DashboardPage;

export const Head = () => (
  <>
    <title>Dashboard</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
