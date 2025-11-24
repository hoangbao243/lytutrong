"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "<p>Nhập nội dung...</p>",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange && onChange(html);
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Nhập URL ảnh:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    let url = prompt("Nhập URL:");
    if (url) {
      // Nếu không có http/https thì tự thêm vào
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const removeLink = () => editor.chain().focus().unsetLink().run();

  return (
    <div className="border border-gray-500 rounded-xl p-4 space-y-3 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {/* Undo / Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="btn"
        >
          <img
            src="/images/icon/undo.png"
            alt="undo"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="btn"
        >
          <img
            src="/images/icon/redo.png"
            alt="redo"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>

        {/* Text styles */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`font-bold text-xl text-gray-400 cursor-pointer`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`flex items-center justify-center cursor-pointer`}
        >
          <img
            src="/images/icon/italic.png"
            alt="italic"
            className="w-5 h-5 mt-0.5"
          />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`underline text-xl text-gray-400 cursor-pointer`}
        >
          U
        </button>

        {/* Highlight */}
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={``}
        >
          <img
            src="/images/icon/highlight.png"
            alt="HL"
            className="w-5 h-5 mt-0.5 cursor-pointer"
          />
        </button>

        {/* Text Color */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-7 h-7 mt-2"
        />

        {/* Heading */}
        <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>
        <select
          onChange={(e) => {
            const level = Number(e.target.value);
            editor.chain().focus().setHeading({ level }).run();
          }}
          className="border p-1 rounded border-gray-400 text-gray-500 text-xl"
        >
          <option value="0" className="text-gray-400">
            Paragraph
          </option>
          <option value="1" className="text-gray-400">
            Heading 1
          </option>
          <option value="2" className="text-gray-400">
            Heading 2
          </option>
          <option value="3" className="text-gray-400">
            Heading 3
          </option>
        </select>
        <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={``}
        >
          <img
            src="/images/icon/list.png"
            alt="list"
            className="w-5 h-5 cursor-pointer"
          />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "btn-active" : "btn"}
        >
          <img
            src="/images/icon/orderlist.png"
            alt="orderlist"
            className="w-5 h-5 cursor-pointer"
          />
        </button>

        {/* Align */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="btn"
        >
          <img
            src="/images/icon/leftalign.png"
            alt="leftalign"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="btn"
        >
          <img
            src="/images/icon/centeralign.png"
            alt="centeralign"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="btn"
        >
          <img
            src="/images/icon/rightalign.png"
            alt="rightalign"
            className="w-5 h-5 cursor-pointer"
          />
        </button>

        <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>

        {/* Link */}
        <button className="btn" onClick={setLink}>
          <img
            src="/images/icon/link.png"
            alt="link"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <button className="btn" onClick={removeLink}>
          <img
            src="/images/icon/unlink.png"
            alt="unlink"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
        <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>

        {/* Image */}
        <button className="btn" onClick={addImage}>
          <img
            src="/images/icon/imageIcon.png"
            alt="image"
            className="w-5 h-5 cursor-pointer"
          />
        </button>

        
      </div>

      {/* Content */}
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
}
