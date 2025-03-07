"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Editor from "@/app/components/Editor";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type FormData = {
  title: string;
  body?: string;
  image?: string;
  link?: string;
  subreddit: string;
};

export default function SubmitPage() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData: FormData) => {
    if (!session) {
      setError("You must be signed in to post");
      return;
    }

    // if (!formData.subreddit) {
    //   setError("Please choose a community");
    //   return;
    // }

    try {
      setError(null);
      setIsSubmitting(true);
      console.log("Submitting form with data:", {
        ...formData,
        username: session?.user?.name,
      });
      // TODO: Add your API call here
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="container max-w-4xl mx-auto p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Create a post</h1>
          <Button variant="outline" className="rounded-full">
            Drafts
          </Button>
        </div>

        <div className="bg-white dark:bg-darkmode-gray rounded-lg shadow p-4 mb-4">
          {/* Community selection */}
          {/* <div className="mb-4">
            <Button variant="outline" className="w-full justify-start">
              Choose a community
            </Button>
          </div> */}

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
            </TabsList>

            <div className="mt-4">
              <Input
                {...register("title")}
                placeholder={
                  session ? "Create a post" : "Sign in to create a post"
                }
                disabled={!session || isSubmitting}
                maxLength={300}
                className="mb-2"
              />
              <div className="text-xs text-gray-500 text-right mb-4">
                {(watch("title") || "").length}/300
              </div>
              <TabsContent value="text">
                <Editor
                  {...register("body")}
                  value={watch("body") || ""}
                  onChange={(html: string) => {
                    const plainText = html.replace(/<[^>]*>/g, "");
                    setValue("body", plainText, { shouldDirty: true });
                  }}
                />
              </TabsContent>

              {/* PLACEHOLDER -- NEED TO IMPLEMENT DRAG AND DROP */}
              <TabsContent value="media">
                <div className="border border-dashed rounded-lg p-12 text-center">
                  Drag and drop images or videos
                </div>
              </TabsContent>
              <TabsContent value="link">
                <Input
                  {...register("link")}
                  placeholder="Link URL"
                  className="mb-4"
                />
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-4 flex justify-end gap-4">
            <Button
              type="button"
              className="rounded-full dark:bg-[#105bca] dark:text-white"
              disabled={isSubmitting || !watch("title")}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              className="rounded-full dark:bg-[#105bca] dark:text-white"
              disabled={isSubmitting || !watch("title")}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
