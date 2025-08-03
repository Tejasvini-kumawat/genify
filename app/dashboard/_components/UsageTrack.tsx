"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useUsage } from './UsageContext';
import { AlertTriangle, Loader2, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UsageTrack = () => {
  const { totalUsage, creditLimit, hasExceededCredits, subscriptionStatus, isLoading } = useUsage();
  const router = useRouter();
  const usagePercentage = Math.min((totalUsage / creditLimit) * 100, 100);

  const formatCreditLimit = (limit: number) => {
    if (limit === Infinity || limit >= 1000000) {
      return 'Unlimited';
    }
    return limit.toLocaleString();
  };

  const handleUpgrade = () => {
    router.push('/dashboard/billing');
  };

  if (isLoading) {
    return (
      <div className='m-5'>
        <div className='bg-primary text-white rounded-lg p-3'>
          <div className='flex items-center justify-center'>
            <Loader2 className='w-4 h-4 animate-spin mr-2' />
            <span className='text-sm'>Loading credits...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='m-5'>
             <div className={`${hasExceededCredits ? 'bg-red-500' : 'bg-gradient-genify'} text-white rounded-lg p-3`}>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-medium'>Credits</h2>
          {hasExceededCredits && (
            <AlertTriangle className='w-4 h-4' />
          )}
        </div>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              hasExceededCredits ? 'bg-red-200' : 'bg-white'
            }`}
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <h2 className={`text-sm my-2 ${hasExceededCredits ? 'text-red-100' : ''}`}>
          {totalUsage.toLocaleString()}/{formatCreditLimit(creditLimit)} Credit Used
        </h2>
        {subscriptionStatus && subscriptionStatus !== 'free' && (
          <p className='text-xs text-green-100 mt-1'>
            {subscriptionStatus === 'active' ? 'Active Plan' : subscriptionStatus}
          </p>
        )}
        {hasExceededCredits && (
          <p className='text-xs text-red-100 mt-1'>
            Upgrade required to continue
          </p>
        )}
      </div>
      
      {/* Upgrade Button */}
               <Button 
           variant={'secondary'} 
           className={`w-full my-3 transition-all duration-200 cursor-pointer ${
             hasExceededCredits 
               ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
               : 'bg-gradient-genify text-white hover:opacity-90 shadow-lg'
           }`}
           onClick={handleUpgrade}
         >
                   <Zap className={`w-4 h-4 mr-2 ${hasExceededCredits ? 'text-white' : 'text-white'}`} />
        {hasExceededCredits ? 'Upgrade Now' : 'Upgrade Plan'}
      </Button>
      
      {/* Quick Upgrade Link for exceeded credits */}
      {hasExceededCredits && (
        <div className='text-center'>
          <Link 
            href="/dashboard/billing" 
            className='text-xs text-red-400 hover:text-red-300 underline cursor-pointer'
          >
            View all plans →
          </Link>
        </div>
      )}
    </div>
  );
};

export default UsageTrack;
