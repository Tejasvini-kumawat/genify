'use client';

import React from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CreateNewContent = () => {
  const params = useParams();
  const slug = params['template-slug'];

  const selectedTemplate: TEMPLATE =
    Templates.find((item) => item.slug === slug) || Templates[0];

    const GenerateAIContent=()=> (formData:any) => {
      // Here you can handle the form data and generate AI content
      console.log("Form Data:", formData);
      // You can call an API or perform any action with the form data
    };
  return (
    <div className='p-10'>
        <Link href={"/dashboard"}> <Button><ArrowLeft/>Back</Button>
        </Link>
       
         <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
      <FormSection selectedTemplate={selectedTemplate} userFormInput={(v: any) => GenerateAIContent(v)} />
      <div className='col-span-2'>
        <OutputSection />
      </div>
    </div>
    </div>
   
  );
};

export default CreateNewContent;
