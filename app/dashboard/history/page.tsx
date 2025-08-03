"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Templates from '@/app/(data)/Templates';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';

interface HistoryItem {
  id: number;
  templateSlug: string;
  aiResponse: string;
  formData: string;
  createdAt: string;
}

const HistoryPage = () => {
  const { user } = useUser();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      setLoading(true);
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
      setHistory(result as HistoryItem[]);
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  const handleCopy = async (aiResponse: string, id: number) => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = aiResponse;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">TEMPLATE</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">AI RES</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">DATE</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">WORDS</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-6">Loading...</td></tr>
            ) : history.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-6">No history found.</td></tr>
            ) : (
              history.map((item) => {
                const template = Templates.find((t) => t.slug === item.templateSlug);
                const isCopied = copiedId === item.id;
                
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                      {template?.icon && (
                        <Image src={template.icon} alt="icon" width={24} height={24} className="inline-block" />
                      )}
                      {item.templateSlug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate" title={item.aiResponse}>
                      {item.aiResponse.slice(0, 60)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.aiResponse.split(/\s+/).length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(item.aiResponse, item.id)}
                          className="flex items-center gap-1"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage; 