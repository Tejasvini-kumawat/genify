"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useUsage } from './UsageContext';
import { AlertTriangle } from 'lucide-react';

const UsageTrack = () => {
  const { totalUsage } = useUsage();
  const hasExceededCredits = totalUsage >= 10000;
  const usagePercentage = Math.min((totalUsage / 10000) * 100, 100);

  return (
    <div className='m-5'>
      <div className={`${hasExceededCredits ? 'bg-red-500' : 'bg-primary'} text-white rounded-lg p-3`}>
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
          {totalUsage}/10,000 Credit Used
        </h2>
        {hasExceededCredits && (
          <p className='text-xs text-red-100 mt-1'>
            Upgrade required to continue
          </p>
        )}
      </div>
      <Button 
        variant={'secondary'} 
        className={`w-full my-3 ${hasExceededCredits ? 'bg-red-500 text-white hover:bg-red-600' : 'text-primary'}`}
        onClick={() => {
          // Add upgrade logic here - could redirect to billing page
          window.location.href = '/dashboard/billing';
        }}
      >
        {hasExceededCredits ? 'Upgrade Now' : 'Upgrade'}
      </Button>
    </div>
  );
};

export default UsageTrack;
