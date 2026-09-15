import React, { useState } from "react";
import { usePersistentState } from "../../modules/dashboard/cloudStorage";
import { Category } from "../../modules/dashboard/types";
import { Card, CardSubtitle, CardTitle, TabBar, TabButton, TextArea } from "./styles";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "personal", label: "Personal" },
  { key: "home", label: "Home" }
];

const EMPTY_NOTES: Record<Category, string> = { work: "", personal: "", home: "" };

export const NotesSection = () => {
  const [notes, setNotes, hydrated] = usePersistentState<Record<Category, string>>(
    "dashboard.notes",
    EMPTY_NOTES
  );
  const [active, setActive] = useState<Category>("work");

  if (!hydrated) return null;

  const activeLabel = CATEGORIES.find((c) => c.key === active)?.label ?? "";

  return (
    <Card id="notes">
      <CardTitle>Notes</CardTitle>
      <CardSubtitle>Free space for anything that doesn&apos;t fit a checklist</CardSubtitle>
      <TabBar>
        {CATEGORIES.map((c) => (
          <TabButton key={c.key} type="button" $active={active === c.key} onClick={() => setActive(c.key)}>
            {c.label}
          </TabButton>
        ))}
      </TabBar>
      <TextArea
        placeholder={`${activeLabel} notes...`}
        value={notes[active]}
        onChange={(e) => setNotes((n) => ({ ...n, [active]: e.target.value }))}
      />
    </Card>
  );
};
