'use client';

import React, { useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateGeminiContent } from '@/utils/AiModal'; 
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema'; // ✅ Import your table schema here
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useUsage } from '../../_components/UsageContext';

const CreateNewContent = () => {
  const params = useParams();
  const slug = params['template-slug'];

  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();
  const { refreshUsage, totalUsage } = useUsage();
  const [loading, setLoading] = useState(false);
  const [showCreditAlert, setShowCreditAlert] = useState(false);

  const selectedTemplate: TEMPLATE =
    Templates.find((item) => item.slug === slug) || Templates[0];

  // Check if user has exceeded credit limit
  const hasExceededCredits = totalUsage >= 10000;

  const GenerateAIContent = async (formData: any) => {
    // Check credit limit before generating content
    if (hasExceededCredits) {
      setShowCreditAlert(true);
      return;
    }

    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;

    try {
      const text = await generateGeminiContent(FinalAIPrompt);
      console.log('✅ Generated:', text);
      setAiOutput(text);
      await saveInDb(formData, selectedTemplate?.slug, text); // ✅ pass text here, not aiOutput
      await refreshUsage(); // Refresh credits after saving
    } catch (err) {
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveInDb = async (formData: any, slug: any, aiRes: string) => {
    const result = await db.insert(AIOutput).values({
      formData: JSON.stringify(formData) || '',
      templateSlug: slug || '',
      aiResponse: aiRes,
      createdBy: user?.primaryEmailAddress?.emailAddress || '',
      createdAt: moment().format('DD/MM/yyyy'),
    });
    console.log('✅ Saved in DB:', result);
  };

  return (
    <div className="p-10">
      <Link href={'/dashboard'}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>

      {/* Credit Limit Alert */}
      {showCreditAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Credit Limit Exceeded</h3>
              <p className="text-sm text-gray-500 mb-4">
                You have used all your free credits ({totalUsage}/10,000 words). 
                Please upgrade your plan to continue generating content.
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => setShowCreditAlert(false)}
                  variant="outline"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setShowCreditAlert(false);
                    // Add upgrade logic here - could redirect to billing page
                    window.location.href = '/dashboard/billing';
                  }}
                  className="bg-primary text-white"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GenerateAIContent}
          loading={loading}
          hasExceededCredits={hasExceededCredits}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
