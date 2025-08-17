import { Search, Menu } from 'lucide-react'
import React from 'react'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <div className='p-4 lg:p-5 shadow-sm border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800'>
      <div className='flex items-center gap-4'>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Search Bar */}
        <div className='flex gap-2 items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 max-w-lg hidden sm:flex'>
          <Search className='text-gray-500 dark:text-gray-400'/>
          <input 
            type='text' 
            placeholder='Search templates...' 
            className='outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm' 
          />
        </div>
      </div>

      <div className='flex items-center gap-2 lg:gap-4'>
        <ThemeToggle />
        
        {/* Membership Banner - Hidden on mobile */}
        <div className='hidden md:block'>
          <span className='bg-gradient-genify text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm'>
            🔥 Join Membership just at $9.99/month
          </span>
        </div>
    
        {/* Auth Section */}
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="sm" className="hidden sm:block">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

export default Header