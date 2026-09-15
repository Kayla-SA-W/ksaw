import React, { useState } from "react";
import { usePersistentState } from "../../modules/dashboard/cloudStorage";
import { Category, CategoryFilter, HomeProject, ProjectStatus, ProjectTask } from "../../modules/dashboard/types";
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
  SubAddRow,
  SubRow,
  TextArea,
  TextInput
} from "./styles";

const makeId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

interface Props {
  filter: CategoryFilter;
}

export const HomeProjectsSection = ({ filter }: Props) => {
  const [projects, setProjects, hydrated] = usePersistentState<HomeProject[]>("dashboard.homeProjects", []);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("home");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState<Record<string, string>>({});
  const [projectView, setProjectView] = useState<string>("all");

  if (!hydrated) return null;

  const visibleProjects = projects
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => projectView === "all" || p.id === projectView);

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setProjects((p) => [
      ...p,
      {
        id: makeId(),
        title: trimmed,
        notes: "",
        status: "not-started",
        category,
        createdAt: new Date().toISOString(),
        tasks: []
      }
    ]);
    setTitle("");
  };

  const updateStatus = (id: string, status: ProjectStatus) => {
    setProjects((p) => p.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const updateNotes = (id: string, notes: string) => {
    setProjects((p) => p.map((item) => (item.id === id ? { ...item, notes } : item)));
  };

  const removeProject = (id: string) => {
    setProjects((p) => p.filter((item) => item.id !== id));
    if (projectView === id) setProjectView("all");
  };

  const addTask = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = (newTaskText[projectId] ?? "").trim();
    if (!text) return;
    const task: ProjectTask = { id: makeId(), text, done: false };
    setProjects((p) => p.map((item) => (item.id === projectId ? { ...item, tasks: [...item.tasks, task] } : item)));
    setNewTaskText((t) => ({ ...t, [projectId]: "" }));
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((p) =>
      p.map((item) =>
        item.id === projectId
          ? { ...item, tasks: item.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : item
      )
    );
  };

  const removeTask = (projectId: string, taskId: string) => {
    setProjects((p) =>
      p.map((item) =>
        item.id === projectId ? { ...item, tasks: item.tasks.filter((t) => t.id !== taskId) } : item
      )
    );
  };

  return (
    <Card id="projects">
      <CardTitle>Home &amp; Personal Projects</CardTitle>
      <CardSubtitle>Add your own - not pre-filled, so nothing personal lives in the site&apos;s code</CardSubtitle>

      {projects.length > 0 && (
        <Row style={{ borderBottom: "none", paddingTop: 0 }}>
          <RowLabel style={{ flex: "none", fontSize: 13, opacity: 0.7 }}>Show:</RowLabel>
          <Select value={projectView} onChange={(e) => setProjectView(e.target.value)}>
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Select>
        </Row>
      )}

      {visibleProjects.length === 0 && (
        <EmptyState>
          {projects.length === 0 ? "No projects yet - add one below." : "Nothing matches this filter."}
        </EmptyState>
      )}

      {visibleProjects.map((project) => {
        const doneTasks = project.tasks.filter((t) => t.done).length;
        return (
          <div key={project.id}>
            <Row>
              <RowLabel
                $done={project.status === "done"}
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                style={{ cursor: "pointer" }}
              >
                {expanded === project.id ? "▾ " : "▸ "}
                {project.title}
                {project.tasks.length > 0 ? ` (${doneTasks}/${project.tasks.length})` : ""}
              </RowLabel>
              <Badge $category={project.category}>{project.category}</Badge>
              <Select
                value={project.status}
                onChange={(e) => updateStatus(project.id, e.target.value as ProjectStatus)}
              >
                <option value="not-started">Not started</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </Select>
              <IconButton type="button" onClick={() => removeProject(project.id)} aria-label="Remove project">
                &times;
              </IconButton>
            </Row>

            {expanded === project.id && (
              <>
                {project.tasks.map((task) => (
                  <SubRow key={task.id}>
                    <Checkbox checked={task.done} onChange={() => toggleTask(project.id, task.id)} />
                    <RowLabel $done={task.done}>{task.text}</RowLabel>
                    <IconButton
                      type="button"
                      onClick={() => removeTask(project.id, task.id)}
                      aria-label="Remove task"
                    >
                      &times;
                    </IconButton>
                  </SubRow>
                ))}

                <SubAddRow onSubmit={(e) => addTask(project.id, e)}>
                  <TextInput
                    placeholder="Add a task for this project..."
                    value={newTaskText[project.id] ?? ""}
                    onChange={(e) => setNewTaskText((t) => ({ ...t, [project.id]: e.target.value }))}
                  />
                  <PrimaryButton type="submit">Add task</PrimaryButton>
                </SubAddRow>

                <div style={{ paddingLeft: 26 }}>
                  <TextArea
                    placeholder="Notes for this project..."
                    value={project.notes}
                    onChange={(e) => updateNotes(project.id, e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}

      <AddRow onSubmit={addProject}>
        <TextInput placeholder="Add a project..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </Select>
        <PrimaryButton type="submit">Add</PrimaryButton>
      </AddRow>
    </Card>
  );
};
