// import fs from "fs";
// import path from "path";
// import { faker } from "@faker-js/faker";

// import { labels, difficulty, timeComplexity } from "./data";

// const tasks = Array.from({ length: 100 }, () => ({
//   algoID: `Algo-${faker.number.int({ min: 1000, max: 9999 })}`,
//   title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   status: faker.helpers.arrayElement(timeComplexity).value,
//   label: faker.helpers.arrayElement(labels).value,
//   difficulty: faker.helpers.arrayElement(difficulty).value,
// }));

// fs.writeFileSync(
//   path.join(__dirname, "algorithms.json"),
//   JSON.stringify(tasks, null, 2)
// );

// console.log("✅ Tasks data generated.");
