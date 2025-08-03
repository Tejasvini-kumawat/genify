'use client'

import { FileClock, WalletCards, Settings } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Home as HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link';

const SideNav = () => {
  const MenuList = [
    {
      name: 'Home',
      icon: HomeIcon,
      path: '/dashboard',
    },
    {
      name: 'History',
      icon: FileClock,
      path: '/dashboard/history',
    },
    {
      name: 'Billing',
      icon: WalletCards,
      path: '/dashboard/billing',
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ]

  const path = usePathname()

  useEffect(() => {
    console.log('Current path:', path)
  }, [path])

  return (
    <div className='h-screen relative p-5 shadow-sm border border-gray-200 dark:border-gray-800 w-60 bg-white dark:bg-black'>
      <div className='flex justify-center mb-8'>
        <Image src='/logo.svg' alt='logo' width={120} height={100} />
      </div>
      <hr className='my-6 border border-gray-200 dark:border-gray-700' />

      <div className='mt-3'>
        {MenuList.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white items-center rounded-md transition-colors duration-200 cursor-pointer 
              ${path === item.path ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300'}`}
          >
            <item.icon className='h-6 w-6' />
            <h2 className='text-lg'>{item.name}</h2>
          </Link>
        ))}
      </div >
      <div className='absolute bottom-10 left-0 w-full' >
  <UsageTrack />
      </div>
    
    </div>
  )
}

export default SideNav
