import Stripe from "stripe";

export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { products } = req.body;

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.title,
          images: [item.images[0]],
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: lineItems,

      mode: "payment",

      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "IN"],
      },

      phone_number_collection: {
        enabled: true,
      },

      success_url: `${process.env.CLIENT_URL}/success`,

      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
