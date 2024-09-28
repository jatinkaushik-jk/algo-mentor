"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, difficulty, timeComplexity } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",

    cell: ({ row }) => (
      <Checkbox
        // checked={row.getIsSelected()}
        disabled
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium hover:text-primary cursor-pointer">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "timeComplexity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Complexity" />
    ),
    cell: ({ row }) => {
      const timeComplexityValue = timeComplexity.find(
        (timeComplexity) =>
          timeComplexity.value === row.getValue("timeComplexity")
      );

      if (!timeComplexityValue) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{timeComplexityValue.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficultyLevel = difficulty.find(
        (difficulty) => difficulty.value === row.getValue("difficulty")
      );

      if (!difficultyLevel) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span
            className="font-semibold"
            style={{ color: difficultyLevel.color }}
          >
            {difficultyLevel.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
