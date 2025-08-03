'use client';
import React from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { UsageContextProvider } from './_components/UsageContext';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <UsageContextProvider>
      <div className='bg-slate-100 h-screen'>
          <div className='md:w-64 hidden md:block fixed'>
              <SideNav/>
          </div>
          <div className='md:ml-64 p-4'>
            <Header/>
       {children}
          </div>
   
      </div>
    </UsageContextProvider>
  )
}

export default layout
