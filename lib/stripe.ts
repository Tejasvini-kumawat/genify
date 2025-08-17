import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

// Initialize Stripe with your secret key
export const stripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    });
  }
  return stripeInstance;
};

// Stripe publishable key for client-side
export const getStripePublishableKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
};

// Product IDs for different plans
export const STRIPE_PRODUCTS = {
  PRO_PLAN: process.env.STRIPE_PRO_PRODUCT_ID || 'prod_pro_plan',
  ENTERPRISE_PLAN: process.env.STRIPE_ENTERPRISE_PRODUCT_ID || 'prod_enterprise_plan',
};

// Price IDs for different plans
export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly',
  ENTERPRISE_MONTHLY: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_enterprise_monthly',
}; 