import { Search } from 'lucide-react'
import React from 'react'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const Header = () => {
  return (
         <div className='p-5 shadow-sm border-b-2 border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-black'>
                 <div className='flex gap-2 items-center  p-2 border border-gray-200 dark:border-gray-700 rounded-md max-w-lg bg-white dark:bg-gray-900'>
           <Search className='text-gray-500 dark:text-gray-400'/>
           <input type='text' placeholder='Search...' className='outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400' />
         </div>
               <div className='flex items-center gap-4'>
         <ThemeToggle />
         <h2 className='bg-gradient-genify p-1 rounded-full text-xs text-white px-2'>
           🔥Join Membership just at $9.99/month
         </h2>
            
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
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
        </div>
    </div>
  )
}

export default Header