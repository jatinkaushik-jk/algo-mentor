import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/dbConnect";
import Conversation from "@/model/conversation"; // Import the Conversation model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, messages } = req.body;

  await dbConnect();

  try {
    await Conversation.findOneAndUpdate(
      { userId }, // Search by userId
      { $push: { messages: { $each: messages } } }, // Append messages
      { upsert: true, new: true } // Create a new record if it doesn't exist
    );
    res.status(200).json({ message: "Conversation saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error saving conversation history." });
  }
}
