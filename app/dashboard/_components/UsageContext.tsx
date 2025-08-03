"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";

interface UsageContextType {
  totalUsage: number;
  refreshUsage: () => Promise<void>;
}

const UsageContext = createContext<UsageContextType>({
  totalUsage: 0,
  refreshUsage: async () => {},
});

export const UsageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState(0);

  const fetchUsage = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const result = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
    let usage = 0;
    result.forEach((item) => {
      // Count words in aiResponse
      if (item.aiResponse && typeof item.aiResponse === 'string') {
        usage += item.aiResponse.split(/\s+/).filter(Boolean).length;
      }
    });
    setTotalUsage(usage);
  }, [user]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  return (
    <UsageContext.Provider value={{ totalUsage, refreshUsage: fetchUsage }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => useContext(UsageContext); 