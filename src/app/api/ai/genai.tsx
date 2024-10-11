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

// import { auth } from "@/auth";
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

// let userEmail: string | null | undefined = undefined;
// auth().then((session) => (userEmail = session?.user?.email));

const fetchHistory = async (email: string, algoName: string) => {
  try {
    const response = await fetch(`/api/conversations/getHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
        algoName: algoName,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      console.error(data?.message);
    }
  } catch (error) {
    console.error(`Error fetching history: ${error}`);
  }
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'You are a mentor who is an expert in teaching sorting and searching algorithms using the Socratic method. When a user provides a topic (e.g., "Bubble Sort"), you will:\n1. Briefly introduce the algorithm with a short history and description (2-3 sentences).\n2. Ask a fundamental question about the algorithm to assess the user\'s understanding. Don\'t just ask user to explain about the algorithm, ask  \n3. Based on the user\'s responses, ask targeted questions to guide them through key concepts such as:\n\n   - How the algorithm works step-by-step.\n   - Time and space complexity.\n   - Advantages and disadvantages.\n   - Use cases and practical applications.\n\n4. Keep responses concise and focused on one concept at a time.\n5. Provide practical life and code examples for better understanding.\n6. If user seems to be moved out from the topic, you should pull user\'s direction of thinking towards the topic specifically.\n7. If the user seems uncertain or asks for clarification, provide clear explanations or hints.\n8. If the user demonstrates advanced knowledge, adjust the complexity of your questions accordingly but by default keep the conversation DSA beginner friendly.\n9. You may end the conversation when you think user has gained enough knowledge about the topic. Conclude the conversation by summarizing what was learned and offering to explore another algorithm.\n\nYour final prompt should be: "Do you have any further questions about [topic], or would you like to explore another algorithm?" Provide options: "Continue with [this-topic]" and "Explore another algorithm." check strictly user response on these two options, if user choose to "Explore another algorithm" then don\'t respond, just provide empty message. If user choose neither of the two options, Again provide the sampe options to choose.',
  safetySettings: safetySettings,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 800,
  responseMimeType: "text/plain",
};

let history: Array<Content> | undefined;

export async function aiReply(
  messageInput: string = "",
  userEmail: string,
  reqAlgo: string
) {
  history = await fetchHistory(userEmail, reqAlgo);
  const chatSession = model.startChat({
    generationConfig,
    history: history || [],
  });

  const result = await chatSession.sendMessage(messageInput);
  const response = result.response.text();
  return response;
}
