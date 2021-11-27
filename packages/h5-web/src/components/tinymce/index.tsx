import React, { useState } from 'react'
import type { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'

export const Tinymce = () => {
  const [editor, setEditor] = useState<TinyMCEEditor | null>(null)

  return (
    <Editor
      onEditorChange={(_, editor) => setEditor(editor)}
      tinymceScriptSrc="https://cdn.jsdelivr.net/npm/@kazura/tinymce@5.8.1/tinymce.min.js"
      initialValue=""
      init={{
        height: '70vh',
        menubar: false,
        branding: false,
        language: 'zh_CN',
        fontsize_formats: '12px 14px 15px 16px 17px 18px 20px 24px',
        plugins: ['lists advlist hr codesample wordcount code help'],
        toolbar: [
          'undo redo | removeformat | formatselect fontsizeselect | bold italic underline strikethrough superscript subscript | forecolor backcolor' +
            'alignleft aligncenter alignright alignjustify | lineheight bullist numlist | blockquote hr codesample | wordcount code help',
        ],
      }}
    />
  )
}
