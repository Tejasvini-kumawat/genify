# Stripe Payment Gateway Setup Guide

## Prerequisites
1. A Stripe account (sign up at https://stripe.com)
2. Your Genify application running locally

## Step 1: Get Stripe API Keys

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** > **API keys**
3. Copy your **Publishable key** and **Secret key**
4. For webhooks, go to **Developers** > **Webhooks** and create a new endpoint

## Step 2: Create Products and Prices in Stripe

### Create Pro Plan Product
1. Go to **Products** in your Stripe Dashboard
2. Click **Add product**
3. Name: "Pro Plan"
4. Description: "100,000 words per month"
5. Create a recurring price:
   - Amount: $9.99
   - Billing period: Monthly
   - Copy the Price ID (starts with `price_`)

### Create Enterprise Plan Product
1. Create another product named "Enterprise Plan"
2. Description: "Unlimited words per month"
3. Create a recurring price:
   - Amount: $29.99
   - Billing period: Monthly
   - Copy the Price ID

## Step 3: Set Up Webhooks

1. Go to **Developers** > **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret**

## Step 4: Environment Variables

Create a `.env.local` file in your project root with:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Product IDs
STRIPE_PRO_PRODUCT_ID=prod_your_pro_product_id
STRIPE_ENTERPRISE_PRODUCT_ID=prod_your_enterprise_product_id

# Stripe Price IDs
STRIPE_PRO_MONTHLY_PRICE_ID=price_your_pro_price_id
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_your_enterprise_price_id

# Client-side Price IDs
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_your_pro_price_id
NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID=price_your_enterprise_price_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Existing Configuration
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_DRIZZLE_DB_URL=your_database_url_here
```

## Step 5: Update Database Schema

Run the database migration to add the new subscription table:

```bash
npm run db:push
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the billing page
3. Try to upgrade to a paid plan
4. Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## Step 7: Production Deployment

For production:

1. Switch to **Live mode** in Stripe Dashboard
2. Update environment variables with live keys
3. Update webhook endpoint URL to your production domain
4. Update `NEXT_PUBLIC_APP_URL` to your production URL

## Features Implemented

✅ **Checkout Sessions**: Secure payment flow with Stripe Checkout
✅ **Webhook Handling**: Automatic subscription management
✅ **Database Integration**: User subscription tracking
✅ **Credit Limit Management**: Dynamic word limits based on plan
✅ **Success/Error Handling**: User feedback for payment status
✅ **Loading States**: Visual feedback during payment processing

## Security Features

- Webhook signature verification
- Server-side payment processing
- Secure API key management
- User authentication integration with Clerk

## Next Steps

1. **Subscription Management**: Add a page for users to manage their subscriptions
2. **Usage Analytics**: Track usage patterns and billing
3. **Email Notifications**: Send payment confirmations and reminders
4. **Invoice Management**: Allow users to download invoices
5. **Team Billing**: Support for team/organization billing

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**: Check your webhook endpoint URL and ensure it's publicly accessible
2. **Payment failing**: Verify your Stripe keys are correct and in the right mode (test/live)
3. **Database errors**: Ensure the new schema has been applied with `npm run db:push`

### Support

For Stripe-specific issues, check the [Stripe Documentation](https://stripe.com/docs)
For application issues, check the console logs and network tab in your browser 