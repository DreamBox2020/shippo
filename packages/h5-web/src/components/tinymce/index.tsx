import React, { useRef } from 'react'
import type { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'

export const Tinymce = () => {
  const [editor, setEditor] = useState<TinyMCEEditor | null>(null)

  return (
    <Editor
      onEditorChange={(_, editor) => setEditor(editor)}
      tinymceScriptSrc="https://cdn.jsdelivr.net/npm/@kazura/tinymce@5.8.1/tinymce.min.js"
      initialValue=""
      init={{
        height: 500,
        menubar: false,
        branding: false,
        language: 'zh_CN',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
      }}
    />
  )
}
