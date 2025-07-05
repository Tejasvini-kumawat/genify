"use client";
import { useState } from 'react';
import React from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


interface PROPS {
  selectedTemplate?: TEMPLATE;
    userFormInput: (formData: any) => void;
}

// This component is used to display the form section for a selected template
const FormSection = ({ selectedTemplate,userFormInput }: PROPS) => {

    const [formData, setFormData] = useState();
    const handleInputChange=(event:any)=>{
const { name, value } = event.target;
        setFormData((prevData:any) => ({
            ...prevData,
            [name]: value
        }));
    }
    const onsubmit = (e:any) => {
        // Handle form submission logic here    
e.preventDefault();
// console.log("Form Data:", formData);
userFormInput(formData);

    }
  return (
    <div className='p-5 border rounded-lg shadow-md bg-white '>
      {selectedTemplate?.icon && (
        <Image
          src={selectedTemplate.icon}
          alt='icon'
          width={70}
          height={70}
          className='mb-3'
        />
      )}
      <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form className='mt-6 ' onSubmit={onsubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div  key={index} className='my-2 flex flex-col gap-2 mb-7'>
            <label className='font-bold '>
              {item.label}
            </label>
            {item.field === 'input' ? (
              <Input name={item.name} required={item?.required}
              onChange={handleInputChange} />
            ) : item.field === 'textarea' ? (
              <Textarea name={item.name} required={item?.required}
              onChange={handleInputChange} />
            ) : null}
          </div>
        ))}

        <Button  type="submit"  className='w-full py-6'> Generate Content</Button>
      </form>
    </div>
  );
};

export default FormSection;
