import { Metadata } from "next";
import { algorithms as algos } from "../data/algorithms";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "AlgoMentor Dashboard",
  description: "AlgoMentor' dashboard section",
};

export default function AlgorithmTable() {
  return (
    <>
      <div className="h-full w-full flex-1 flex-col space-y-8 p-2 md:flex">
        <DataTable data={algos} columns={columns} />
      </div>
    </>
  );
}
