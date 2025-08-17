'use client'

import { FileClock, WalletCards, Settings, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Home as HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SideNavProps {
  onClose?: () => void;
}

const SideNav = ({ onClose }: SideNavProps) => {
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

  const handleMenuClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className='h-screen relative p-5 shadow-sm border border-gray-200 dark:border-gray-800 w-64 bg-white dark:bg-black'>
      {/* Mobile Close Button */}
      <div className='flex justify-between items-center mb-8 lg:hidden'>
        <Image src='/logo.svg' alt='logo' width={120} height={100} />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMenuClick}
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Desktop Logo */}
      <div className='flex justify-center mb-8 hidden lg:flex'>
        <Image src='/logo.svg' alt='logo' width={120} height={100} />
      </div>

      <hr className='my-6 border border-gray-200 dark:border-gray-700' />

      <div className='mt-3'>
        {MenuList.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            onClick={handleMenuClick}
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white items-center rounded-md transition-colors duration-200 cursor-pointer 
              ${path === item.path ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300'}`}
          >
            <item.icon className='h-6 w-6' />
            <h2 className='text-lg'>{item.name}</h2>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full px-5'>
        <UsageTrack />
      </div>
    </div>
  )
}

export default SideNav
