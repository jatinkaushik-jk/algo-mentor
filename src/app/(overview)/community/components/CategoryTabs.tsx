"use client";
import { useState } from "react";

const categories = ["For You", "Career", "Contest", "Interview", "Feedback"];

export default function CategoryTabs({ onChange }: { onChange: (category: string) => void }) {
  const [active, setActive] = useState("For You");

  return (
    <div className="flex gap-4 border-b pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setActive(cat);
            onChange(cat);
          }}
          className={`text-sm font-medium ${active === cat ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}