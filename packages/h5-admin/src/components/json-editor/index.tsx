import 'jsoneditor/dist/jsoneditor.min.css'
import Editor from 'jsoneditor'
import React, { useEffect, useRef, useState } from 'react'

export interface JSONEditorProps {
  json: string
}

export const JSONEditor: React.FC<JSONEditorProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const editor = new Editor(ref.current, {})
      console.log(props.json)
      editor.set(JSON.parse(props.json))
    }
  }, [])

  return <div style={{ width: '100%', height: '100%' }} ref={ref}></div>
}
