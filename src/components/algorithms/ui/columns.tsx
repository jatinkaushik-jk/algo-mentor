"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";

import { difficulty, access, category } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { toast } from "sonner";

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "select",

  //   cell: ({ row }) => (
  //     <Checkbox
  //       // checked={row.getIsSelected()}
  //       disabled
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span
            // get algorithm details for redirection
            onClick={async () => {
              try {
                const res = await fetch("api/actions/algo-actions", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(row.original),
                });
                const result = await res.json();
                if (res.status == 200) {
                  window.location.href = `/socratic-ai/${row.original.title
                    .toLowerCase()
                    .replace(/ /g, "-")}`;
                }
                else if (res.status == 403) {
                  toast.error(result.message, {
                    description: "Please upgrade your plan to access this feature.",
                    action: {
                      label: "Upgrade",
                      onClick: () => window.location.href = '/pricing',
                    },
                  });
                } else {
                  toast.error(result.message);
                }
              } catch (error) {
                console.log("Error: ", error);
              }
            }}
            className="sm:max-w-[200px] max-w-28 overflow-x-hidden text-ellipsis truncate font-medium hover:text-primary cursor-pointer"
          >
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const categoryValue = category.find((cat) => cat.value === row.getValue("category"));
      return (
        <div>
          <Badge variant="outline" className="text-pretty">{categoryValue?.label}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p className="max-w-[250px] overflow-x-hidden text-ellipsis truncate">
            {row.getValue("description")}
          </p>
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
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("timeComplexity")}</span>
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

      return (
        <div className="flex items-center">
          <span
            className="font-semibold"
            style={{ color: difficultyLevel?.color }}
          >
            {difficultyLevel?.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "access",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Access" />
    ),
    cell: ({ row }) => {
      const accessFlags = access.find(
        (access) => access.value === row.getValue("access")
      );

      if (!accessFlags) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span
            className="font-semibold"
            style={{ color: accessFlags.color }}
          >
            <accessFlags.icon size={16}/>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
