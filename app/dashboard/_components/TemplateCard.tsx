import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
import { useUsage } from './UsageContext'
import { AlertTriangle } from 'lucide-react'

const TemplateCard = ( item:TEMPLATE) => {
  const { hasExceededCredits } = useUsage();

  const handleClick = (e: React.MouseEvent) => {
    if (hasExceededCredits) {
      e.preventDefault();
      alert('You have exceeded your credit limit. Please upgrade to continue using templates.');
    }
  };

  return (
    <Link 
      href={hasExceededCredits ? '#' : `/dashboard/content/${item?.slug}`}
      onClick={handleClick}
    >
      <div className={`p-4 lg:p-5 border rounded-lg shadow-sm bg-white flex flex-col gap-3 cursor-pointer transition-all h-full ${
        hasExceededCredits 
          ? 'opacity-60 hover:scale-100 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-md'
      }`}>
        
        <div className="flex items-center gap-3">
          <Image src={item.icon} alt='icon' width={40} height={40} className="flex-shrink-0"/>
          <h2 className='font-medium text-base lg:text-lg'>{item.name}</h2>
        </div>
        <p className='text-gray-500 text-sm lg:text-base line-clamp-3 flex-grow'>{item.desc}</p>
        
        {/* Credit Limit Warning */}
        {hasExceededCredits && (
          <div className='mt-auto p-2 bg-red-50 border border-red-200 rounded-md'>
            <div className='flex items-center gap-1 text-red-700'>
              <AlertTriangle className='w-3 h-3 flex-shrink-0' />
              <span className='text-xs font-medium'>Credit Limit Exceeded</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default TemplateCard