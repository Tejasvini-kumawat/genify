"use client";
import React from 'react';
import { UserProfile } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SettingsPage = () => {
  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0",
                pageScrollBox: "p-0",
                navbar: "hidden",
                pageContent: "p-6"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 