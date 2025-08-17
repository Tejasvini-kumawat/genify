import Templates from '@/app/(data)/Templates'
import React, { useEffect } from 'react'
import TemplateCard from './TemplateCard';

export interface TEMPLATE {
    name: string;
    desc: string;
    icon: string;
    category: string; // fixed typo from "categorty"
    slug: string;
    aiPrompt: string;
    form?: FORM[];
}

export interface FORM {
    label: string;
    field: string;
    name: string;
    required?: boolean;
}



const TemplateListSection = ({userSearchInput}:any) => {
  const [TemplateList, setTemplateList] = React.useState<TEMPLATE[]>(Templates);
  useEffect(() => {
    // console.log("User Search Input:", userSearchInput);
    if (userSearchInput) {
      const filteredTemplates = Templates.filter((item: TEMPLATE) => {
        return item.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
               item.desc.toLowerCase().includes(userSearchInput.toLowerCase()) ||
               item.category.toLowerCase().includes(userSearchInput.toLowerCase());
      });
      setTemplateList(filteredTemplates);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 p-0 lg:p-10'>
      {TemplateList.map((item: TEMPLATE, index: number) => (
     <TemplateCard key={index} {...item} />
      ))}
    </div>
  )
}

export default TemplateListSection
