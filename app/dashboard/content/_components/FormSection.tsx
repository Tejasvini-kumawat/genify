'use client';

import { useState } from 'react';
import React from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon, AlertTriangle } from 'lucide-react';

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any) => void;
  loading: boolean;
  hasExceededCredits?: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading, hasExceededCredits }: PROPS) => {
  const [formData, setFormData] = useState<Record<string, any>>({}); // ✅ properly typed default state

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
    
  console.log("🚀 Submit button clicked with data:", formData); // ✅ add this
  
};



  return (
    <div className='p-4 lg:p-5 border rounded-lg shadow-md bg-white'>
      <div className="flex items-center gap-3 mb-4">
        {selectedTemplate?.icon && (
          <Image
            src={selectedTemplate.icon}
            alt='icon'
            width={50}
            height={50}
            className='flex-shrink-0'
          />
        )}
        <div>
          <h2 className='font-bold text-xl lg:text-2xl text-primary'>{selectedTemplate?.name}</h2>
          <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
        </div>
      </div>
      
      {/* Credit Limit Warning */}
      {hasExceededCredits && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
          <div className='flex items-center gap-2 text-red-700'>
            <AlertTriangle className='w-4 h-4 flex-shrink-0' />
            <span className='text-sm font-medium'>Credit Limit Exceeded</span>
          </div>
          <p className='text-xs text-red-600 mt-1'>
            You have used all your free credits. Please upgrade to continue.
          </p>
        </div>
      )}
      
      <form className='mt-6 space-y-4' onSubmit={onsubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <label className='font-bold text-sm lg:text-base'>{item.label}</label>
            {item.field === 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                disabled={hasExceededCredits}
                className="w-full"
              />
            ) : item.field === 'textarea' ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                disabled={hasExceededCredits}
                className="w-full min-h-[100px]"
              />
            ) : null}
          </div>
        ))}

        <Button 
          disabled={loading || hasExceededCredits} 
          type='submit' 
          className='w-full py-4 lg:py-6 mt-6'
        >
          {loading && <Loader2Icon className='animate-spin mr-2' />}
          {hasExceededCredits ? 'Upgrade Required' : 'Generate Content'}
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
