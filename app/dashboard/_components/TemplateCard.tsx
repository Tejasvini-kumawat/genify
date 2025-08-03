import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
import { useUsage } from './UsageContext'
import { AlertTriangle } from 'lucide-react'

const TemplateCard = ( item:TEMPLATE) => {
  const { totalUsage } = useUsage();
  const hasExceededCredits = totalUsage >= 10000;

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
      <div className={`p-5 border rounded-md shadow-md bg-white flex flex-col gap-3 cursor-pointer transition-all ${
        hasExceededCredits 
          ? 'opacity-60 hover:scale-100 cursor-not-allowed' 
          : 'hover:scale-105'
      }`}>
        
        <Image src={item.icon} alt='icon' width={50} height={50}/>
        <h2 className='font-medium text-lg'>{item.name}</h2>
        <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
        
        {/* Credit Limit Warning */}
        {hasExceededCredits && (
          <div className='mt-2 p-2 bg-red-50 border border-red-200 rounded-md'>
            <div className='flex items-center gap-1 text-red-700'>
              <AlertTriangle className='w-3 h-3' />
              <span className='text-xs font-medium'>Credit Limit Exceeded</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default TemplateCard