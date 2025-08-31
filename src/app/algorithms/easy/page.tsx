"use client";
import { useEffect, useState } from "react";
import AlgorithmTable from "@/components/algorithms/ui/algorithm-table";
import { AccessValues, Algorithm, DifficultyValues } from "@/models/user.model";
import { algorithms } from "@/components/algorithms/data/algorithms";

const EasyAlgorithmsPage = () => {
    const [algos, setAlgos] = useState<Algorithm[]>([]);
  useEffect(()=>{
      const fetchAlgorithms = async ()=>{
        const easyAlgos = algorithms.filter(algo => algo.difficulty === "Easy").map(algo => ({...algo, difficulty: algo.difficulty as DifficultyValues, access: (algo.access as AccessValues)}));
        setAlgos(easyAlgos);
      }
      fetchAlgorithms();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <AlgorithmTable algos={algos} tableFilterProps={{ difficulty: false }} />
    </div>
  )
}

export default EasyAlgorithmsPage