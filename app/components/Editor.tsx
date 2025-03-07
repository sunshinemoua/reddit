"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeLine,
  RiLink,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiCodeBoxLine,
} from "react-icons/ri";
import React from "react";

export interface EditorProps {
  onChange?: (html: string) => void;
  value?: string;
}

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  ({ onChange, value }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: "Text (optional)",
        }),
      ],
      content: value,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
        },
      },
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
    });

    React.useEffect(() => {
      if (editor && value === "") {
        editor.commands.clearContent();
      }
    }, [value, editor]);

    if (!editor) {
      return null;
    }

    return (
      <div ref={ref} className="border rounded-md">
        <div className="flex items-center space-x-1 p-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-800" : ""
            }
          >
            <RiBold />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-800" : ""
            }
          >
            <RiItalic />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "bg-slate-200 dark:bg-slate-800" : ""
            }
          >
            <RiStrikethrough />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={
              editor.isActive("code") ? "bg-slate-200 dark:bg-slate-800" : ""
            }
          >
            <RiCodeLine />
          </Button>
          <div className="h-4 w-px bg-gray-300 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? "bg-slate-200 dark:bg-slate-800"
                : ""
            }
          >
            <RiListUnordered />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? "bg-slate-200 dark:bg-slate-800"
                : ""
            }
          >
            <RiListOrdered />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote")
                ? "bg-slate-200 dark:bg-slate-800"
                : ""
            }
          >
            <RiDoubleQuotesL />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={
              editor.isActive("codeBlock")
                ? "bg-slate-200 dark:bg-slate-800"
                : ""
            }
          >
            <RiCodeBoxLine />
          </Button>
        </div>
        <EditorContent editor={editor} className="min-h-[200px]" />
        <style jsx global>{`
          .ProseMirror {
            min-height: 200px;
            padding: 1rem;
          }
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
        `}</style>
      </div>
    );
  }
);

export default Editor;
