import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/utils/db';
import { UserSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment successful for session:', session.id);
        
        // Update user subscription in database
        if (session.metadata?.userId && session.metadata?.planName) {
          try {
            const wordLimit = session.metadata.planName === 'Pro Plan' ? 100000 : 
                             session.metadata.planName === 'Enterprise' ? Infinity : 10000;
            
            await db.insert(UserSubscriptions).values({
              userId: session.metadata.userId,
              email: session.customer_details?.email || '',
              stripeCustomerId: session.customer as string,
              planName: session.metadata.planName,
              status: 'active',
              wordLimit: wordLimit,
              createdAt: new Date(),
              updatedAt: new Date(),
            }).onConflictDoUpdate({
              target: UserSubscriptions.userId,
              set: {
                planName: session.metadata.planName,
                status: 'active',
                wordLimit: wordLimit,
                updatedAt: new Date(),
              }
            });
            
            console.log('✅ User subscription updated in database');
          } catch (dbError) {
            console.error('❌ Error updating subscription in database:', dbError);
          }
        }
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id);
        
        // Update subscription ID in database
        if (subscription.metadata?.userId) {
          try {
            await db.update(UserSubscriptions)
              .set({
                stripeSubscriptionId: subscription.id,
                status: subscription.status,
                currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
                updatedAt: new Date(),
              })
              .where(eq(UserSubscriptions.userId, subscription.metadata.userId));
            
            console.log('✅ Subscription ID updated in database');
          } catch (dbError) {
            console.error('❌ Error updating subscription ID:', dbError);
          }
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', updatedSubscription.id);
        
        // Update subscription status in database
        if (updatedSubscription.metadata?.userId) {
          try {
            await db.update(UserSubscriptions)
              .set({
                status: updatedSubscription.status,
                currentPeriodStart: new Date((updatedSubscription as any).current_period_start * 1000),
                currentPeriodEnd: new Date((updatedSubscription as any).current_period_end * 1000),
                cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
                updatedAt: new Date(),
              })
              .where(eq(UserSubscriptions.userId, updatedSubscription.metadata.userId));
            
            console.log('✅ Subscription status updated in database');
          } catch (dbError) {
            console.error('❌ Error updating subscription status:', dbError);
          }
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', deletedSubscription.id);
        
        // Update subscription status to canceled
        if (deletedSubscription.metadata?.userId) {
          try {
            await db.update(UserSubscriptions)
              .set({
                status: 'canceled',
                updatedAt: new Date(),
              })
              .where(eq(UserSubscriptions.userId, deletedSubscription.metadata.userId));
            
            console.log('✅ Subscription marked as canceled in database');
          } catch (dbError) {
            console.error('❌ Error updating subscription status:', dbError);
          }
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded for invoice:', invoice.id);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed for invoice:', failedInvoice.id);
        
        // Update subscription status to past_due
        if (failedInvoice.subscription) {
          try {
            await db.update(UserSubscriptions)
              .set({
                status: 'past_due',
                updatedAt: new Date(),
              })
              .where(eq(UserSubscriptions.stripeSubscriptionId, failedInvoice.subscription as string));
            
            console.log('✅ Subscription marked as past_due in database');
          } catch (dbError) {
            console.error('❌ Error updating subscription status:', dbError);
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 