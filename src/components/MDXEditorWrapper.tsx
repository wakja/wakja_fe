"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  CodeToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface MDXEditorWrapperProps {
  content: string;
  onChange: (value: string) => void;
}

export default function MDXEditorWrapper({
  content,
  onChange,
}: MDXEditorWrapperProps) {
  return (
    <MDXEditor
      markdown={content}
      onChange={onChange}
      placeholder="내용을 입력하세요... 이미지는 하단의 이미지 첨부 영역에서 추가할 수 있습니다."
      contentEditableClassName="prose max-w-none min-h-[300px] p-3 text-[13px]"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <Separator />
              <ListsToggle />
              <Separator />
              <CodeToggle />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
            </>
          ),
        }),
      ]}
    />
  );
}
