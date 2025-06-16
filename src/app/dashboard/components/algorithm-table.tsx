import { Metadata } from "next";
import { algorithms as algos } from "../data/algorithms";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "AlgoMentor Dashboard",
  description: "AlgoMentor' dashboard section",
};

// Simulate a database read for tasks.
// async function getAlgos() {
//   // const algos = JSON.parse(data.toString());

//   return z.array(algorithmSchema).parse(algos);
// }

export default function AlgorithmTable() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-2 md:flex">
        <DataTable data={algos} columns={columns} />
      </div>
    </>
  );
}
