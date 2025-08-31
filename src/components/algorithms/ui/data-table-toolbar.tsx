"use client";

import { CircleX } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { difficulty, category, timeComplexity, access } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showFilters?: ShowFiltersOptions;
}

export interface ShowFiltersOptions {
  searchBar?: boolean;
  difficulty?: boolean;
  category?: boolean;
  timeComplexity?: boolean;
  access?: boolean;
  viewOptions?: boolean;
}

export const defaultShowFiltersOptions: ShowFiltersOptions = {
  searchBar: true,
  difficulty: true,
  category: true,
  timeComplexity: true,
  access: true,
  viewOptions: true,
};

export function DataTableToolbar<TData>({
  table,
  showFilters = defaultShowFiltersOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 space-y-2 flex-wrap">
        {showFilters.searchBar && <Input
          placeholder="Filter algorithms..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />}
          {showFilters.difficulty && table.getColumn("difficulty") && (
            <DataTableFacetedFilter
              column={table.getColumn("difficulty")}
              title="Difficulty"
              options={difficulty}
            />
          )}
          {showFilters.category && table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Category"
              options={category}
            />
          )}
        {showFilters.timeComplexity && table.getColumn("timeComplexity") && (
          <DataTableFacetedFilter
            column={table.getColumn("timeComplexity")}
            title="Time Complexity"
            options={timeComplexity}
          />
        )}
        {showFilters.access && table.getColumn("access") && (
          <DataTableFacetedFilter
            column={table.getColumn("access")}
            title="Access"
            options={access}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CircleX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {showFilters.viewOptions && <DataTableViewOptions table={table} />}
    </div>
  );
}
