"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Copy, Check } from 'lucide-react';

interface Props{
  aiOutput:string
}

// Function to convert RTF to plain text
const convertRTFToPlainText = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  // Handle RTF content
  if (text.startsWith('{\\rtf1')) {
    return text
      .replace(/\\rtf1[^}]*/, '') // Remove RTF header
      .replace(/\\[a-z0-9-]+\d*\s?/g, '') // Remove RTF commands
      .replace(/[{}]/g, '') // Remove braces
      .replace(/\\'/g, "'") // Handle escaped apostrophes
      .replace(/\\"/g, '"') // Handle escaped quotes
      .replace(/\\\s/g, ' ') // Handle escaped spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }
  
  return text;
};

const OutputSection = ( {aiOutput}:Props) => {
  const editorRef:any=useRef(Editor);
  const [copied, setCopied] = useState(false);

  useEffect(()=>{
    const editorInstance = editorRef.current.getInstance();
    const cleanText = convertRTFToPlainText(aiOutput);
    editorInstance.setMarkdown(cleanText);
  },[aiOutput])

  const handleCopy = async () => {
    try {
      // Get the markdown content from the editor
      const editorInstance = editorRef.current.getInstance();
      const markdownContent = editorInstance.getMarkdown();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(markdownContent);
      
      // Show success feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      const editorInstance = editorRef.current.getInstance();
      const markdownContent = editorInstance.getMarkdown();
      textArea.value = markdownContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='bg-white shadow-lg border  rounded-lg'>
        <div className='flex justify-between items-center p-5 '>
            <h2 className='font-medium text-lg'>Your Result</h2>
            <Button 
              onClick={handleCopy}
              className='flex gap-2'
              variant={copied ? 'outline' : 'default'}
            >
              {copied ? (
                <>
                  <Check className='w-4 h-4'/>
                  Copied!
                </>
              ) : (
                <>
                  <Copy className='w-4 h-4'/>
                  Copy
                </>
              )}
            </Button>
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