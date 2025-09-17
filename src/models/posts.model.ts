import mongoose from "mongoose";

export interface IPost {
  postId: string;
  title: string;
  content: string;
  category: string;
  label: string;
  tags: string[];
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  upvotes: number;
  views: number;
  comments: number;
}

interface PostType extends mongoose.Document, IPost {}

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

const Post = mongoose.model<PostType>("Post", postSchema);

export default Post;
