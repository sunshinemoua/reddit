"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Editor from "@/components/Editor";

export default function SubmitPage() {
  const [title, setTitle] = useState("");

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Create a post</h1>
        <Button variant="outline" className="rounded-full">
          Drafts
        </Button>
      </div>

      {/* NEED TO UPDATE THIS WITH SHADCN COMBOBOX */}
      <div className="bg-white dark:bg-darkmode-gray rounded-lg shadow p-4 mb-4">
        <div className="mb-4">
          <Button variant="outline" className="w-full justify-start">
            Choose a community
          </Button>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="w-full justify-start dark:bg-transparent">
            <TabsTrigger value="text" className="flex items-center gap-2">
              Text
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              Images & Video
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-2">
              Link
            </TabsTrigger>
            <TabsTrigger value="poll" className="flex items-center gap-2">
              Poll
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
              className="mb-2"
            />
            <div className="text-xs text-gray-500 text-right mb-4">
              {title.length}/300
            </div>

            <TabsContent value="text">
              <Editor />
            </TabsContent>

            <TabsContent value="media">
              <div className="border border-dashed rounded-lg p-12 text-center">
                Drag and drop images or videos
              </div>
            </TabsContent>

            <TabsContent value="link">
              <Input placeholder="Link URL" className="mb-4" />
            </TabsContent>

            <TabsContent value="poll">
              <div className="space-y-4">
                <Input placeholder="Option 1" />
                <Input placeholder="Option 2" />
                <Button variant="outline" className="w-full">
                  Add Option
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-4 flex justify-end gap-4">
          <Button className="rounded-full dark:bg-[#1a1c1e] dark:text-[#4e5052]">
            Save Draft
          </Button>
          <Button className="rounded-full dark:bg-[#1a1c1e] dark:text-[#4e5052]">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
