import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/dbConnect";
import Conversation from "@/model/conversation"; // Import the Conversation model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  await dbConnect();

  try {
    const conversation = await Conversation.findOne({ userId }).exec();
    if (conversation) {
      res.status(200).json({ messages: conversation.messages });
    } else {
      res.status(404).json({ message: "No conversation found for the user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving conversation history." });
  }
}
