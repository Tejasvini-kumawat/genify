'use client';
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { UsageContextProvider } from './_components/UsageContext';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UsageContextProvider>
      <div className='bg-slate-100 dark:bg-black min-h-screen flex'>
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:flex-shrink-0`}>
          <SideNav onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className='flex-1 lg:ml-0'>
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className='p-4 lg:p-6'>
            {children}
          </div>
        </div>
      </div>
    </UsageContextProvider>
  )
}

export default layout
