import React, { useEffect, useState } from "react";
import { usePersistentState } from "../../modules/dashboard/cloudStorage";
import { todayISO, formatFriendlyDate } from "../../modules/dashboard/dateUtils";
import { DAILY_RECURRING } from "../../modules/dashboard/recurringConfig";
import { Category, CategoryFilter, DailyState, DailyTaskItem } from "../../modules/dashboard/types";
import {
  AddRow,
  Badge,
  Card,
  CardSubtitle,
  CardTitle,
  Checkbox,
  EmptyState,
  IconButton,
  PrimaryButton,
  Row,
  RowLabel,
  Select,
  Tag,
  TextInput
} from "./styles";

const makeId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const initialDaily: DailyState = {
  date: todayISO(),
  jiraLogged: false,
  nytGamesDone: false,
  tasks: []
};

interface Props {
  filter: CategoryFilter;
}

export const TodaySection = ({ filter }: Props) => {
  const [daily, setDaily, hydrated] = usePersistentState<DailyState>("dashboard.daily", initialDaily);
  const [carryOver, setCarryOver] = usePersistentState<DailyTaskItem[]>("dashboard.dailyCarryOver", []);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("personal");

  useEffect(() => {
    if (!hydrated) return;
    const today = todayISO();
    if (daily.date !== today) {
      const unfinished = daily.tasks.filter((t) => !t.done);
      if (unfinished.length > 0) setCarryOver(unfinished);
      setDaily({ date: today, jiraLogged: false, nytGamesDone: false, tasks: [] });
    }
    // Only re-check when hydration state or the stored date changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, daily.date]);

  if (!hydrated) return null;

  const toggleTask = (id: string) => {
    setDaily((d) => ({ ...d, tasks: d.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));
  };

  const removeTask = (id: string) => {
    setDaily((d) => ({ ...d, tasks: d.tasks.filter((t) => t.id !== id) }));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newTask.trim();
    if (!text) return;
    setDaily((d) => ({
      ...d,
      tasks: [...d.tasks, { id: makeId(), text, done: false, category: newCategory }]
    }));
    setNewTask("");
  };

  const applyCarryOver = () => {
    setDaily((d) => ({ ...d, tasks: [...d.tasks, ...carryOver] }));
    setCarryOver([]);
  };

  const doneCount = daily.tasks.filter((t) => t.done).length;
  const visibleRecurring = DAILY_RECURRING.filter((item) => filter === "all" || item.category === filter);
  const visibleTasks = daily.tasks.filter((t) => filter === "all" || t.category === filter);

  return (
    <Card id="today">
      <CardTitle>Today &middot; {formatFriendlyDate(daily.date)}</CardTitle>
      <CardSubtitle>
        {daily.tasks.length === 0 ? "Nothing on the list yet" : `${doneCount} of ${daily.tasks.length} done`}
      </CardSubtitle>

      {visibleRecurring.map((item) => {
        const isDone = item.id === "jira-hours" ? daily.jiraLogged : daily.nytGamesDone;
        const onToggle = () => {
          if (item.id === "jira-hours") setDaily((d) => ({ ...d, jiraLogged: !d.jiraLogged }));
          else setDaily((d) => ({ ...d, nytGamesDone: !d.nytGamesDone }));
        };
        return (
          <Row key={item.id}>
            <Checkbox checked={isDone} onChange={onToggle} />
            <RowLabel $done={isDone}>{item.label}</RowLabel>
            {item.optional && <Tag $tone="optional">optional</Tag>}
            <Badge $category={item.category}>{item.category}</Badge>
          </Row>
        );
      })}

      {visibleTasks.map((task) => (
        <Row key={task.id}>
          <Checkbox checked={task.done} onChange={() => toggleTask(task.id)} />
          <RowLabel $done={task.done}>{task.text}</RowLabel>
          <Badge $category={task.category}>{task.category}</Badge>
          <IconButton type="button" onClick={() => removeTask(task.id)} aria-label="Remove task">
            &times;
          </IconButton>
        </Row>
      ))}

      {visibleRecurring.length === 0 && visibleTasks.length === 0 && (
        <EmptyState>
          {daily.tasks.length === 0 && carryOver.length === 0
            ? "Add today's to-dos below."
            : "Nothing matches this filter."}
        </EmptyState>
      )}

      {carryOver.length > 0 && (
        <Row>
          <RowLabel>
            {carryOver.length} unfinished item{carryOver.length > 1 ? "s" : ""} left over
          </RowLabel>
          <PrimaryButton type="button" onClick={applyCarryOver}>
            Add back to today
          </PrimaryButton>
        </Row>
      )}

      <AddRow onSubmit={addTask}>
        <TextInput
          placeholder="Add something to do today..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Select value={newCategory} onChange={(e) => setNewCategory(e.target.value as Category)}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="home">Home</option>
        </Select>
        <PrimaryButton type="submit">Add</PrimaryButton>
      </AddRow>
    </Card>
  );
};
