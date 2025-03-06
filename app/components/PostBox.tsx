"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
const PostBox = () => {
  const { data: session } = useSession();

  return (
    <form>
      <div className="flex items-center space-x-3 rounded-2xl p-2 border border-gray-200">
        <Avatar />
        <input
          disabled={!session}
          className="flex-1 rounded-md p-2 pl-5 outline-none"
          type="text"
          placeholder={session ? "Create a post" : "Sign in to post"}
        />
      </div>
    </form>
  );
};

export default PostBox;
