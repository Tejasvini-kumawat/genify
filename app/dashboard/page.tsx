"use client"
import React, { use } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import { useUsage } from './_components/UsageContext'
import { Button } from '@/components/ui/button'
import { AlertTriangle, X } from 'lucide-react'
import Link from 'next/link'

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = React.useState<string>("");
  const { totalUsage, creditLimit, hasExceededCredits } = useUsage();
  const [showCreditWarning, setShowCreditWarning] = React.useState(true);
  
  const formatCreditLimit = (limit: number) => {
    if (limit === Infinity || limit >= 1000000) {
      return 'Unlimited';
    }
    return limit.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Credit Limit Warning Banner */}
      {hasExceededCredits && showCreditWarning && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start sm:items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Credit Limit Exceeded
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  You have used all your credits ({totalUsage.toLocaleString()}/{formatCreditLimit(creditLimit)} words). 
                  Upgrade your plan to continue generating content.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/dashboard/billing">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Upgrade Now
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreditWarning(false)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <SearchSection onSearchInput={(value:string)=>{setUserSearchInput(value)}}/>
      
      {/* Template List Section  */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard
