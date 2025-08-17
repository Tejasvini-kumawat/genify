import Templates from '@/app/(data)/Templates'
import React, { useEffect, useMemo } from 'react'
import TemplateCard from './TemplateCard';
import { useDebounce } from '@/utils/hooks/useDebounce';

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

interface TemplateListSectionProps {
  userSearchInput: string;
  debounceDelay?: number;
}

const TemplateListSection = ({ userSearchInput, debounceDelay = 300 }: TemplateListSectionProps) => {
  // Debounce the search input to avoid excessive filtering
  const debouncedSearchInput = useDebounce(userSearchInput, debounceDelay);

  // Memoize the filtered templates to avoid recalculating on every render
  const TemplateList = useMemo(() => {
    if (!debouncedSearchInput.trim()) {
      return Templates;
    }

    const searchTerm = debouncedSearchInput.toLowerCase().trim();
    
    return Templates.filter((item: TEMPLATE) => {
      return item.name.toLowerCase().includes(searchTerm) ||
             item.desc.toLowerCase().includes(searchTerm) ||
             item.category.toLowerCase().includes(searchTerm);
    });
  }, [debouncedSearchInput]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 p-0 lg:p-10'>
      {TemplateList.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No templates found for "{debouncedSearchInput}"
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        TemplateList.map((item: TEMPLATE, index: number) => (
          <TemplateCard key={index} {...item} />
        ))
      )}
    </div>
  )
}

export default TemplateListSection
