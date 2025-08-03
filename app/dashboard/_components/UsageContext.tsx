"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput, UserSubscriptions } from "@/utils/schema";
import { eq } from "drizzle-orm";

interface UsageContextType {
  totalUsage: number;
  creditLimit: number;
  refreshUsage: () => Promise<void>;
  hasExceededCredits: boolean;
  subscriptionStatus: string | null;
}

const UsageContext = createContext<UsageContextType>({
  totalUsage: 0,
  creditLimit: 10000,
  refreshUsage: async () => {},
  hasExceededCredits: false,
  subscriptionStatus: null,
});

export const UsageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState(0);
  const [creditLimit, setCreditLimit] = useState(10000); // Default free plan limit
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const fetchUsage = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    try {
      // Fetch user's subscription to determine credit limit
      const subscriptionResult = await db
        .select()
        .from(UserSubscriptions)
        .where(eq(UserSubscriptions.userId, user.id))
        .limit(1);

      if (subscriptionResult.length > 0) {
        const subscription = subscriptionResult[0];
        setCreditLimit(subscription.wordLimit);
        setSubscriptionStatus(subscription.status);
      } else {
        // No subscription found, use free plan limits
        setCreditLimit(10000);
        setSubscriptionStatus('free');
      }

      // Fetch usage data
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
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const hasExceededCredits = totalUsage >= creditLimit;

  return (
    <UsageContext.Provider value={{ 
      totalUsage, 
      creditLimit,
      refreshUsage: fetchUsage, 
      hasExceededCredits,
      subscriptionStatus
    }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => useContext(UsageContext); 