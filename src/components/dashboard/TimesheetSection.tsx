import React from "react";
import { usePersistentState } from "../../modules/dashboard/cloudStorage";
import { formatFriendlyDate, nextOccurrence } from "../../modules/dashboard/dateUtils";
import { BIWEEKLY_REMINDERS } from "../../modules/dashboard/recurringConfig";
import { CategoryFilter } from "../../modules/dashboard/types";
import { Badge, Card, CardSubtitle, CardTitle, Checkbox, EmptyState, Row, RowLabel, Tag, TagTone } from "./styles";

interface Props {
  filter: CategoryFilter;
}

export const TimesheetSection = ({ filter }: Props) => {
  const [acked, setAcked, hydrated] = usePersistentState<Record<string, boolean>>("dashboard.timesheetAck", {});

  if (!hydrated) return null;

  const visible = BIWEEKLY_REMINDERS.filter((r) => filter === "all" || r.category === filter);

  return (
    <Card id="timesheet">
      <CardTitle>Timesheet</CardTitle>
      <CardSubtitle>Every other Friday</CardSubtitle>

      {visible.length === 0 && <EmptyState>Nothing matches this filter.</EmptyState>}

      {visible.map((reminder) => {
        const occ = nextOccurrence(reminder.anchorDate, reminder.intervalDays);
        const key = `${reminder.id}::${occ.iso}`;
        const done = !!acked[key];
        const toggle = () => setAcked((a) => ({ ...a, [key]: !a[key] }));
        const tone: TagTone | undefined = done ? "done" : occ.isToday ? "due" : undefined;

        return (
          <Row key={reminder.id}>
            <Checkbox checked={done} onChange={toggle} />
            <RowLabel $done={done}>{reminder.label}</RowLabel>
            <Tag $tone={tone}>
              {done ? "done" : occ.isToday ? "today" : `in ${occ.daysUntil}d · ${formatFriendlyDate(occ.iso)}`}
            </Tag>
            <Badge $category={reminder.category}>{reminder.category}</Badge>
          </Row>
        );
      })}
    </Card>
  );
};
