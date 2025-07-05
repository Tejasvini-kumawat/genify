"use client"
import React, { use } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'



const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = React.useState<string>("");
  return (
    <div>
      {/* Search Section */}
      <SearchSection onSearchInput={(value:string)=>{setUserSearchInput(value)}}/>
      {/* Template List Section  */}
   <TemplateListSection userSearchInput={userSearchInput} />
    
    </div>
  )
}

export default Dashboard
