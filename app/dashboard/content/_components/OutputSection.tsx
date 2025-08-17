"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
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
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      CodeBlock,
    ],
    content: '',
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      const cleanText = convertRTFToPlainText(aiOutput);
      editor.commands.setContent(cleanText);
    }
  }, [aiOutput, editor]);

  const handleCopy = async () => {
    try {
      if (!editor) return;
      
      // Get the HTML content from the editor
      const htmlContent = editor.getHTML();
      
      // Convert HTML to plain text for clipboard
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      
      // Copy to clipboard
      await navigator.clipboard.writeText(plainText);
      
      // Show success feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      if (!editor) return;
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = editor.getHTML();
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      
      const textArea = document.createElement('textarea');
      textArea.value = plainText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
        <div className='flex justify-between items-center p-5'>
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
        <div className='px-5 pb-5'>
          <div className='border rounded-lg p-4 min-h-[600px] bg-gray-50'>
            <EditorContent editor={editor} />
          </div>
        </div>
    </div>
  )
}

export default OutputSection