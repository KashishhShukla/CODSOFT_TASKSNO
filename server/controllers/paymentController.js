import Stripe from 'stripe';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret || stripeSecret.includes('mock')) {
      return res.json({
        clientSecret: 'mock_client_secret_' + Math.random().toString(36).substring(7),
        isMock: true,
        message: 'Mock Stripe payment intent created successfully for test mode',
      });
    }

    const stripe = new Stripe(stripeSecret);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['card'],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      isMock: false,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.json({
      clientSecret: 'mock_client_secret_' + Math.random().toString(36).substring(7),
      isMock: true,
      message: 'Fallback to mock Stripe flow: ' + error.message,
    });
  }
};
