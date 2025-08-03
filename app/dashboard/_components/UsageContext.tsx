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
  isLoading: boolean;
}

const UsageContext = createContext<UsageContextType>({
  totalUsage: 0,
  creditLimit: 10000,
  refreshUsage: async () => {},
  hasExceededCredits: false,
  subscriptionStatus: null,
  isLoading: false,
});

export const UsageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState(0);
  const [creditLimit, setCreditLimit] = useState(10000); // Default free plan limit
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Improved word counting function
  const countWords = (text: string): number => {
    if (!text || typeof text !== 'string') return 0;
    
    // Handle RTF content
    if (text.startsWith('{\\rtf1')) {
      // Extract plain text from RTF
      const plainText = text
        .replace(/\\rtf1[^}]*/, '') // Remove RTF header
        .replace(/\\[a-z0-9-]+\d*\s?/g, '') // Remove RTF commands
        .replace(/[{}]/g, '') // Remove braces
        .replace(/\\'/g, "'") // Handle escaped apostrophes
        .replace(/\\"/g, '"') // Handle escaped quotes
        .replace(/\\\s/g, ' ') // Handle escaped spaces
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      const words = plainText.split(/\s+/).filter(word => word.length > 0);
      return words.length;
    }
    
    // Remove HTML tags and extra whitespace
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[a-zA-Z0-9#]+;/g, ' ') // Replace HTML entities with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Split by whitespace and filter out empty strings
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    return words.length;
  };

  const fetchUsage = useCallback(async () => {
    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
      console.log('No user or email found');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Fetching usage for user:', user.id);
      
      // Fetch user's subscription to determine credit limit
      try {
        const subscriptionResult = await db
          .select()
          .from(UserSubscriptions)
          .where(eq(UserSubscriptions.userId, user.id))
          .limit(1);

        console.log('Subscription result:', subscriptionResult);

        if (subscriptionResult.length > 0) {
          const subscription = subscriptionResult[0];
          setCreditLimit(subscription.wordLimit);
          setSubscriptionStatus(subscription.status);
          console.log('User has subscription:', subscription);
        } else {
          // No subscription found, use free plan limits
          setCreditLimit(10000);
          setSubscriptionStatus('free');
          console.log('No subscription found, using free plan');
        }
      } catch (subscriptionError) {
        console.error('Error fetching subscription:', subscriptionError);
        // Fallback to free plan if subscription table doesn't exist or has issues
        setCreditLimit(10000);
        setSubscriptionStatus('free');
      }

      // Fetch usage data
      try {
        const result = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
        
        console.log('AI Output result count:', result.length);
        
        let usage = 0;
        result.forEach((item, index) => {
          // Count words in aiResponse
          if (item.aiResponse && typeof item.aiResponse === 'string') {
            const wordCount = countWords(item.aiResponse);
            usage += wordCount;
            console.log(`Item ${index}: ${wordCount} words`);
          }
        });
        
        console.log('Total usage calculated:', usage);
        setTotalUsage(usage);
      } catch (usageError) {
        console.error('Error fetching usage:', usageError);
        setTotalUsage(0);
      }
      
    } catch (error) {
      console.error('Error in fetchUsage:', error);
      // Set default values on error
      setTotalUsage(0);
      setCreditLimit(10000);
      setSubscriptionStatus('free');
    } finally {
      setIsLoading(false);
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
      subscriptionStatus,
      isLoading
    }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => useContext(UsageContext); 