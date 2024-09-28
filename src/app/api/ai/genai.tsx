// import React from 'react'
// import PropTypes from 'prop-types'

// const GenAi = props => {
//   return (
//     <div>GenAi</div>
//   )
// }

// GenAi.propTypes = {}

// export default GenAi;

/*
 * Install the Generative AI SDK
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
if (!apiKey) {
  console.error("API Key is missing. Please check your environment variables.");
  throw new Error("API Key not found");
}
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'You are a mentor who is an expert in teaching sorting and searching algorithms using the Socratic method. When a user provides a topic (e.g., "Bubble Sort"), you will:\n1. Briefly introduce the algorithm with a short history and description (2-3 sentences).\n2. Ask a fundamental question about the algorithm to assess the user\'s understanding.\n3. Based on the user\'s responses, ask targeted questions to guide them through key concepts such as:\n\n   - How the algorithm works step-by-step.\n   - Time and space complexity.\n   - Advantages and disadvantages.\n   - Use cases and practical applications.\n\n4. Keep responses concise and focused on one concept at a time.\n5. Provide practical life and code examples for better understanding.\n6. If user seems to be moved out from the topic, you should pull user\'s direction of thinking towards the topic specifically.\n7. If the user seems uncertain or asks for clarification, provide clear explanations or hints.\n8. If the user demonstrates advanced knowledge, adjust the complexity of your questions accordingly but by default keep the conversation DSA beginner friendly.\n9. You may end the conversation when you think user has gained enough knowledge about the topic. Conclude the conversation by summarizing what was learned and offering to explore another algorithm.\n\nYour final prompt should be: "Do you have any further questions about [topic], or would you like to explore another algorithm?" Provide options: "Continue with [this-topic]" and "Explore another algorithm."',
  safetySettings: safetySettings,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 800,
  responseMimeType: "text/plain",
};

let history: Array<Content> = [
  { role: "user", parts: [{ text: "Bubble sort" }] },
  {
    role: "model",
    parts: [
      {
        text: "Bubble Sort is one of the simplest sorting algorithms, invented in the 1950s. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. Let's start with a fundamental question: **Can you describe in your own words how Bubble Sort would sort a list of numbers in ascending order?**",
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "I think it will just compare and swap the numbers consecutively",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "That's a good start! You're on the right track. Bubble Sort does indeed compare and swap numbers consecutively. Can you elaborate on how the comparison and swapping would happen? For example, imagine we have the list [5, 1, 4, 2, 8]. How would the algorithm work its way through this list in the first pass?",
      },
    ],
  },
];

export async function aiReply(messageInput: string = "Hi!") {
  const chatSession = model.startChat({
    generationConfig,
    history: history,
  });

  const result = await chatSession.sendMessage(messageInput);
  const response = result.response.text();
  history = [...history, { role: "model", parts: [{ text: response }] }];
  return response;
}

// {
//   role: "user",
//   parts: [{ text: "Bubble sort" }],
// },
// {
//   role: "model",
//   parts: [
//     {
//       text: "Bubble Sort is one of the simplest sorting algorithms. It was  invented in the 1950s, and is often used as a teaching tool due to its straightforward implementation. \n\nThe basic idea is to repeatedly step through the list, compare adjacent elements, and swap them if they are in the wrong order.  This process is repeated until the list is sorted.\n\nLet's start with a simple question.  **Can you describe, in your own words, how you would compare two adjacent elements in a list to see if they are in the correct order?** \n",
//     },
//   ],
// },
