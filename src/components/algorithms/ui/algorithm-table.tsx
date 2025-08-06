import { algorithms } from "../data/algorithms";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Algorithm } from "@/models/user.model";

export default function AlgorithmTable({algos}:{algos? : Algorithm[]}) {
  return (
    <>
      <div className="h-full w-full flex-1 flex-col space-y-8 p-2 md:flex">
        <DataTable data={algos ? algos : algorithms} columns={columns} />
      </div>
    </>
  );
}
