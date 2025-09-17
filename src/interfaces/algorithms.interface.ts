export interface IModule {
  state: StateValues;
  algorithm: IAlgorithm;
  conversation: IConversation[];
}

export enum StateValues {
  pending = "PENDING",
  completed = "COMPLETED",
}

export interface IAlgorithm {
  algoID: string;
  title: string;
  description: string;
  timeComplexity: string;
  label: string;
  category: string;
  difficulty: DifficultyValues;
  access: AccessValues;
}

export interface IConversation {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
  // parts?: [
  //   {
  //     type: string;
  //     text: string;
  //   },
  // ];
}

export enum DifficultyValues {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard",
}

export enum AccessValues {
  free = "FREE",
  pro = "PRO",
  master = "MASTER",
}
