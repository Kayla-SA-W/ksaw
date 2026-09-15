import React from "react";
import { usePersistentState } from "../../modules/dashboard/cloudStorage";
import { currentWeekKey, dayLabelOf, formatFriendlyDate, mondayOf, toISODate } from "../../modules/dashboard/dateUtils";
import { WEEKLY_RECURRING } from "../../modules/dashboard/recurringConfig";
import { CategoryFilter, WeeklyCadenceDay } from "../../modules/dashboard/types";
import { Badge, Card, CardSubtitle, CardTitle, Checkbox, EmptyState, Row, RowLabel, Tag, TagTone } from "./styles";

const DAY_ORDER: WeeklyCadenceDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  filter: CategoryFilter;
}

export const WeeklySection = ({ filter }: Props) => {
  const [completions, setCompletions, hydrated] = usePersistentState<Record<string, boolean>>(
    "dashboard.weeklyCompletions",
    {}
  );

  if (!hydrated) return null;

  const weekKey = currentWeekKey();
  const monday = mondayOf(new Date());
  const todayIndex = DAY_ORDER.indexOf(dayLabelOf(new Date()));

  const toggle = (itemId: string) => {
    const key = `${itemId}::${weekKey}`;
    setCompletions((c) => ({ ...c, [key]: !c[key] }));
  };

  const visible = WEEKLY_RECURRING.filter((item) => filter === "all" || item.category === filter);

  return (
    <Card id="week">
      <CardTitle>This Week</CardTitle>
      <CardSubtitle>Week of {formatFriendlyDate(toISODate(monday))}</CardSubtitle>

      {visible.length === 0 && <EmptyState>Nothing matches this filter.</EmptyState>}

      {visible.map((item) => {
        const key = `${item.id}::${weekKey}`;
        const done = !!completions[key];
        let tone: TagTone | undefined;
        let dayText = "";

        if (done) {
          tone = "done";
        } else if (item.days.length === 0) {
          dayText = "any day";
          if (todayIndex === 6) tone = "overdue";
        } else {
          const indices = item.days.map((d) => DAY_ORDER.indexOf(d));
          dayText = item.days.join(" & ");
          if (indices.includes(todayIndex)) tone = "due";
          else if (todayIndex > Math.max(...indices)) tone = "overdue";
        }

        return (
          <Row key={item.id}>
            <Checkbox checked={done} onChange={() => toggle(item.id)} />
            <RowLabel $done={done}>{item.label}</RowLabel>
            <Tag $tone={tone}>{done ? "done" : tone === "overdue" ? "overdue" : dayText}</Tag>
            <Badge $category={item.category}>{item.category}</Badge>
          </Row>
        );
      })}
    </Card>
  );
};
