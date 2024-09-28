import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { algorithmSchema } from "../data/schema";

export const metadata: Metadata = {
  title: "AlgoMentor Dashboard",
  description: "AlgoMentor' dashboard section",
};

// Simulate a database read for tasks.
async function getAlgos() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/dashboard/data/algorithms.json")
  );

  const algos = JSON.parse(data.toString());

  return z.array(algorithmSchema).parse(algos);
}

export default async function AlgorithmTable() {
  const algos = await getAlgos();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 sm:p-8 md:flex">
        <DataTable data={algos} columns={columns} />
      </div>
    </>
  );
}
