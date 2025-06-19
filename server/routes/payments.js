const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

// Create a payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount, planName } = req.body;

    // Create a payment intent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        planName,
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Error creating payment' });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update user's subscription status in your database
      await handleSuccessfulPayment(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      // Handle failed payment
      await handleFailedPayment(failedPayment);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleSuccessfulPayment(paymentIntent) {
  try {
    const { userId, planName } = paymentIntent.metadata;
    
    // Update user's subscription in your database
    // This is where you would implement the logic to:
    // 1. Update the user's membership status
    // 2. Set the subscription expiration date
    // 3. Send confirmation email
    // 4. Create transaction record
    
    // Example implementation would go here
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    const { userId, planName } = paymentIntent.metadata;
    
    // Handle failed payment:
    // 1. Log the failure
    // 2. Notify the user
    // 3. Update any pending subscription status
    
    // Example implementation would go here
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

module.exports = router; 