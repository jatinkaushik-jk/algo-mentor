"use client";
import { FC } from "react";
import { IPost } from "@/models/posts.model";

const PostCard: FC<IPost> = ({
  postId,
  title,
  content,
  label,
  tags,
  author,
  views,
  createdAt,
  upvotes,
  comments,
}) => {
  return (
    <div className="p-4 bg-background shadow rounded-xl mb-4 border">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm line-clamp-2 text-muted-foreground">{content}</p>
      <div className="flex items-center text-xs gap-4 mt-2 text-muted-foreground">
        <span>👤 {postId}</span>
        <span>👤 {author.name}</span>
        <span>⬆️ {upvotes}</span>
        <span>💬 {comments}</span>
        <span>📈 {views}</span>
        <span>📈 {tags.join(", ")}</span>
      </div>
    </div>
  );
};

export default PostCard;
