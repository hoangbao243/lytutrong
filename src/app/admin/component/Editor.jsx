"use client";
import React, { useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { MAX_FILE_SIZE, handleImageUpload } from "@/lib/tiptap-utils";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Color } from "@tiptap/extension-text-style";
import { Iframe } from "@/components/tiptap-ui/tiptap-iframe/tiptap-Iframe";

export default function Editor({ content, onChange }) {
  const [uploading, setUploading] = useState(false);
  const navigate = useRouter();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Highlight,
      TextStyle.configure({}),
      Color.configure({ types: ["textStyle"] }),
      Image,
      Iframe,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
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

  const handlePublish = async () => {
    try {
      const res = await axios.post(`/api/upload/confirm`);
      if (res.status == 200) {
        const moved = res.data.files;
        // lấy HTML hiện tại
        let html = editor.getHTML();
        // thay từng đường dẫn
        moved.forEach((file) => {
          html = html.replaceAll(file.old, file.new);
        });
        // cập nhật lại Tiptap
        editor.commands.setContent(html);
        if (editor.commands.setContent(html)) {
          const newHTML = editor.getHTML();
          console.log(newHTML);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const res = await axios.post(`/api/upload/cleanup`);
      if (res.status == 200) {
        console.log("ok");
        navigate.push(`/admin/posts`);
      } else {
        console.log(res.status);
      }
      console.log("a");
    } catch (error) {
      console.log(error);
    }
  };
  const handleColor = (e) => {
    const color = e.target.value;
    const { empty, $from } = editor.state.selection;
    if (!editor.state.selection || editor.state.selection.empty) {
      // Lấy vị trí cuối cùng của node hiện tại (paragraph hoặc heading)
      const endPos = $from.end();
      // Đặt con trỏ về cuối node
      editor.commands.setTextSelection(endPos);
      editor.chain().focus().setColor(color).run();
      return;
    }
    editor.chain().focus().setColor(color).run();
  };

  const uploadPDF = async (file) => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("/api/uploadPDF/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  };

  const handleSelectPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Vui lòng chọn file PDF!");
      return;
    }
    setUploading(true);

    const result = await uploadPDF(file);
    setUploading(false);
    console.log("PDF URL:", result);

    // Chèn vào Tiptap
    editor
      .chain()
      .focus()
      .insertContent(
        `
          <iframe
            src="${result.previewLink}"
            width="100%"
            height="500px"
            title="Embedded Content"
          ></iframe>
        `
      )
      .run();
  };
  return (
    <div>
      <div className="flex">
        <div className="border border-gray-500 rounded-xl p-4 space-y-3 bg-white w-2/3">
          {uploading && (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-14 h-14 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          )}
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
              onInput={handleColor}
              value={editor?.getAttributes("textStyle")?.color}
              className="w-7 h-7 mt-1.5"
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
              className={editor.isActive("bulletList") ? "is-active" : ""}
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
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
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
            <div className="mt-0.5">
              {editor && (
                <ImageUploadButton
                  editor={editor}
                  text="Add Image"
                  hideWhenUnavailable={true}
                  showShortcut={true}
                  onInserted={() => console.log("Image inserted!")}
                />
              )}
            </div>
            <p className="w-0.5 h-10 bg-gray-300 mx-2"></p>
            <label className="cursor-pointer inline-flex items-center">
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleSelectPDF(e)}
              />
              <img
                src="/images/icon/pdf.png"
                alt="upload pdf"
                className="hover:scale-110 transition w-7 h-7"
              />
            </label>
          </div>

          {/* Content */}
          <EditorContent
            editor={editor}
            className="max-h-150 min-h-50 overflow-auto bg-gray-100"
          />
        </div>
        <div className="flex flex-col w-1/3 px-4">
          <label htmlFor="category">Danh mục:</label>
          <select name="category" className="border border-gray-200 p-1 rounded-md">
            <option value="1">Nhà trường</option>
            <option value="2">Đoàn thể</option>
            <option value="3">Hoạt động giảng dạy</option>
            <option value="4">Thư viện</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={handlePublish} className="bg-green-300 p-2 rounded">
          Đăng bài
        </button>
        <button onClick={handleCancel} className="bg-red-300 p-2 rounded">
          Hủy
        </button>
      </div>
    </div>
  );
}
