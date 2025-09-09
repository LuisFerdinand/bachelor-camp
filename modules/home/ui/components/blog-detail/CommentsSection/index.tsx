"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, Reply } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  email: string;
  date: string;
  verified: boolean;
  text: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
}

interface Reply {
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
}

interface CommentsSectionProps {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CommentsSection({
  comments,
  setComments,
  activeTab,
  setActiveTab,
}: CommentsSectionProps) {
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;

    const newComment: Comment = {
      id: comments.length + 1,
      name: commentName,
      email: commentEmail,
      date: "Just now",
      verified: false,
      text: commentText,
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  };

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="pt-8 border-t border-neutral-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h3 className="text-display-sm font-bold flex items-center mr-6">
            <MessageSquare className="h-6 w-6 mr-3 text-brand-500" />
            Discussion
          </h3>
          <Badge className="bg-brand-100 text-brand-800 border-0">
            {comments.length} Comments
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-1 font-medium text-sm ${
              activeTab === "overview"
                ? "text-brand-600 border-b-2 border-brand-600"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-3 px-1 font-medium text-sm ${
              activeTab === "comments"
                ? "text-brand-600 border-b-2 border-brand-600"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Comments ({comments.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "comments" && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            {/* Comment Form */}
            <div className="mb-8">
              <h4 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Join the Discussion
              </h4>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email (optional)"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <Textarea
                  placeholder="Share your thoughts, questions, or experiences..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  required
                ></Textarea>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500">
                    Comments are moderated and will appear after approval.
                  </p>
                  <Button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 px-6"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-brand-600">
                          {comment.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{comment.name}</span>
                        {comment.verified && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-brand-100 text-brand-800"
                          >
                            Verified Learner
                          </Badge>
                        )}
                        <span className="text-xs text-neutral-500">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-neutral-700 mb-3">{comment.text}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-1 ${
                            comment.liked
                              ? "text-brand-600"
                              : "text-neutral-500 hover:text-brand-600"
                          } transition-colors`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-neutral-500 hover:text-brand-600 transition-colors">
                          Reply
                        </button>
                      </div>

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-4 ml-6 space-y-4 pl-4 border-l-2 border-neutral-100">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="flex items-start gap-3"
                            >
                              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-neutral-600">
                                    {reply.name.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">
                                    {reply.name}
                                  </span>
                                  <span className="text-xs text-neutral-500">
                                    {reply.date}
                                  </span>
                                </div>
                                <p className="text-neutral-700 text-sm mb-2">
                                  {reply.text}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                  <button className="flex items-center gap-1 text-neutral-500 hover:text-brand-600 transition-colors">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
