'use client';

import React, { useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateGeminiContent } from '@/utils/AiModal'; 

const CreateNewContent = () => {
  const params = useParams();
  const slug = params['template-slug'];

  const [loading,setLoading]=useState(false);
  const selectedTemplate: TEMPLATE =
    Templates.find((item) => item.slug === slug) || Templates[0];

   const GenerateAIContent = async (formData: any) => {
  setLoading(true);
  const selectedPrompt = selectedTemplate?.aiPrompt;
  const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

  try {
    const text = await generateGeminiContent(FinalAIPrompt);
    console.log("✅ Generated:", text);
    
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className='p-10'>
        <Link href={"/dashboard"}> <Button><ArrowLeft/>Back</Button>
        </Link>
       
         <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
      <FormSection selectedTemplate={selectedTemplate}  userFormInput={GenerateAIContent}
        loading={loading}/>
      <div className='col-span-2'>
        <OutputSection />
      </div>
    </div>
    </div>
   
  );
};

export default CreateNewContent;
