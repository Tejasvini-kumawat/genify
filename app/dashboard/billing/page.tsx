"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Crown, Zap } from 'lucide-react';
import Link from 'next/link';
import { useUsage } from '../_components/UsageContext';

const BillingPage = () => {
  const { totalUsage } = useUsage();

  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      credits: '10,000 words',
      features: [
        'Access to all templates',
        'Basic content generation',
        'Content history',
        'Community support'
      ],
      current: true,
      popular: false
    },
    {
      name: 'Pro Plan',
      price: '$9.99',
      period: '/month',
      credits: '100,000 words',
      features: [
        'Everything in Free',
        'Priority generation',
        'Advanced templates',
        'Priority support',
        'Export to multiple formats',
        'Team collaboration'
      ],
      current: false,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: '/month',
      credits: 'Unlimited words',
      features: [
        'Everything in Pro',
        'Custom templates',
        'API access',
        'Dedicated support',
        'White-label solution',
        'Advanced analytics'
      ],
      current: false,
      popular: false
    }
  ];

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">
          {totalUsage >= 10000 
            ? "You've exceeded your free credits. Upgrade to continue generating content!"
            : "Select the perfect plan for your content creation needs"
          }
        </p>
        {totalUsage >= 10000 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md inline-block">
            <p className="text-red-700 text-sm">
              Current usage: {totalUsage.toLocaleString()}/10,000 words
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-6 border rounded-lg shadow-sm ${
              plan.popular 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600">{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{plan.credits}</p>
              
              {plan.current ? (
                <Button variant="outline" disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  onClick={() => {
                    // Add payment integration logic here
                    alert('Payment integration would be implemented here. For now, this is a demo.');
                  }}
                >
                  {plan.popular ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </>
                  ) : (
                    'Get Started'
                  )}
                </Button>
              )}
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Need a custom plan? Contact our sales team
        </p>
        <Button variant="outline">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default BillingPage; 