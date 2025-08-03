"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Templates from '@/app/(data)/Templates';
import Image from 'next/image';

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
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">EDIT</th>
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
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                      {template?.icon && (
                        <Image src={template.icon} alt="icon" width={24} height={24} className="inline-block" />
                      )}
                      {item.templateSlug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate" title={item.aiResponse}>{item.aiResponse.slice(0, 60)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.aiResponse.split(/\s+/).length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="outline" size="sm">Edit</Button>
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