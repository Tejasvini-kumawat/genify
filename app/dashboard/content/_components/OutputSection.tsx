import React from 'react'
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
const OutputSection = () => {
  const editorRef:any=useRef(Editor);
  return (
    <div className='bg-white shadow-lg border  rounded-lg'>
        <div className='flex justify-between items-center p-5 '>
            <h2 className='font-medium text-lg'>Your Result</h2>
            <Button className='flex gap-2'><Copy className='w-4 h-4'/>Copy</Button>
        </div>
        <Editor
        ref={editorRef}
    initialValue="Your generated content will appear here."
  height="600px"
    
    initialEditType="wysiwyg"
    useCommandShortcut={true}
    onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
  /></div>
  )
}

export default OutputSection