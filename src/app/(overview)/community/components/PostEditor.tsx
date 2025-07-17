"use client";
import { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = () => {
    // handle submission (e.g., call API to save post)
    console.log({ title, content, category });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        className="w-full text-xl font-semibold mb-4 border rounded px-3 py-2"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 border rounded px-3 py-2"
      >
        <option value="General">General</option>
        <option value="Career">Career</option>
        <option value="Contest">Contest</option>
        <option value="Interview">Interview</option>
        <option value="Feedback">Feedback</option>
      </select>
      <Editor
        className="bg-background border rounded p-2"
        value={content} onTextChange={(e: EditorTextChangeEvent) => setContent(e.htmlValue as string)} style={{ minHeight: "320px" }}/>
      <button
        className="mt-4 px-4 py-2 rounded bg-primary text-white"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
}