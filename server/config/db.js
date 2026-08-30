import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const autoSeed = async () => {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log('Database empty. Auto-seeding sample products and users...');
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      shippingAddress: {
        address: '100 Admin Plaza',
        city: 'Tech City',
        postalCode: '90001',
        country: 'USA',
      },
    });

    const customerUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'customer',
      shippingAddress: {
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        postalCode: '97477',
        country: 'USA',
      },
    });

    const sampleProducts = [
      {
        title: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        description: 'Industry-leading noise cancellation with two processors and 8 microphones. Exceptional sound quality and crystal-clear hands-free calling.',
        category: 'Electronics',
        price: 398.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 24,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'Apple Watch Series 9 Smartwatch (GPS, 45mm)',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        description: 'S9 chip enables a super-bright display and a magical new double-tap gesture. Advanced health metrics and sleep tracking.',
        category: 'Electronics',
        price: 429.00,
        countInStock: 10,
        rating: 4.9,
        numReviews: 42,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'MacBook Pro 16" M3 Max Space Black',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        description: 'Blazing fast Apple M3 Max silicon with 36GB unified memory and 1TB SSD. Liquid Retina XDR display.',
        category: 'Electronics',
        price: 2499.00,
        countInStock: 8,
        rating: 5.0,
        numReviews: 18,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'Minimalist Ergonomic Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
        description: 'Hot-swappable custom tactile switches, RGB backlighting, aircraft-grade aluminum top case, wireless Bluetooth 5.1.',
        category: 'Electronics',
        price: 149.99,
        countInStock: 25,
        rating: 4.7,
        numReviews: 31,
        featured: false,
        user: adminUser._id,
      },
      {
        title: 'Premium Leather Crossbody Messenger Bag',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
        description: 'Handcrafted full-grain Italian leather with padded laptop sleeve and brass hardware. Timeless design.',
        category: 'Accessories',
        price: 189.50,
        countInStock: 12,
        rating: 4.6,
        numReviews: 15,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'Polarized Aviator Sunglasses (Matte Black)',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
        description: '100% UV400 protection with ultra-lightweight titanium alloy frame and scratch-resistant HD lenses.',
        category: 'Accessories',
        price: 79.99,
        countInStock: 30,
        rating: 4.5,
        numReviews: 19,
        featured: false,
        user: adminUser._id,
      },
      {
        title: 'Organic Cotton Heavyweight Oversized Hoodie',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        description: '450 GSM luxury brushed fleece made from 100% organic cotton. Relaxed streetwear fit with double-lined hood.',
        category: 'Clothing',
        price: 85.00,
        countInStock: 40,
        rating: 4.8,
        numReviews: 53,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'Minimalist Chronograph Stainless Watch',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
        description: 'Japanese quartz movement, sapphire glass crystal, 5ATM water resistance with interchangeable quick-release strap.',
        category: 'Accessories',
        price: 165.00,
        countInStock: 14,
        rating: 4.6,
        numReviews: 22,
        featured: false,
        user: adminUser._id,
      },
      {
        title: 'Smart Ambient RGB Desk Lamp with Wireless Charger',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
        description: 'Stepless dimming, 15W fast wireless charging pad base, HomeKit & Alexa compatible voice activation.',
        category: 'Home & Living',
        price: 69.99,
        countInStock: 20,
        rating: 4.4,
        numReviews: 11,
        featured: false,
        user: adminUser._id,
      },
      {
        title: 'Ceramic Pour-Over Coffee Maker Set',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        description: 'Artisanal matte ceramic dripper with thermal carafe and goose-neck kettle. Complete barista experience.',
        category: 'Home & Living',
        price: 94.00,
        countInStock: 18,
        rating: 4.9,
        numReviews: 27,
        featured: false,
        user: adminUser._id,
      },
      {
        title: 'Ultra-Comfort Mesh Ergonomic Office Chair',
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=800&auto=format&fit=crop&q=80',
        description: '3D lumbar support, 4D adjustable armrests, breathable Korean mesh, dynamic tilt lock.',
        category: 'Home & Living',
        price: 349.00,
        countInStock: 9,
        rating: 4.7,
        numReviews: 36,
        featured: true,
        user: adminUser._id,
      },
      {
        title: 'Waterproof Trail Running Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
        description: 'Vibram high-traction outsole with Gore-Tex waterproof upper and responsive energy-return foam midsole.',
        category: 'Clothing',
        price: 135.00,
        countInStock: 22,
        rating: 4.8,
        numReviews: 48,
        featured: false,
        user: adminUser._id,
      }
    ];

    const createdProducts = await Product.insertMany(sampleProducts);
    
    await Order.create({
      user: customerUser._id,
      orderItems: [
        {
          product: createdProducts[0]._id,
          title: createdProducts[0].title,
          qty: 1,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
        },
      ],
      shippingAddress: customerUser.shippingAddress,
      paymentMethod: 'Stripe',
      paymentResult: { id: 'ch_3M000000000000000', status: 'succeeded', update_time: '2026-08-30' },
      itemsPrice: createdProducts[0].price,
      taxPrice: Number((createdProducts[0].price * 0.1).toFixed(2)),
      shippingPrice: 0.0,
      totalPrice: Number((createdProducts[0].price * 1.1).toFixed(2)),
      isPaid: true,
      paidAt: new Date(),
      status: 'Delivered',
      isDelivered: true,
      deliveredAt: new Date(),
    });

    console.log('Database auto-seeding completed!');
  }
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri) {
      console.log('No MONGO_URI provided in .env. Starting MongoMemoryServer for local development...');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log(`MongoMemoryServer started at: ${uri}`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await autoSeed();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    try {
      console.log('Attempting fallback to MongoMemoryServer...');
      const mongod = await MongoMemoryServer.create();
      const fallbackUri = mongod.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`MongoDB Connected (Memory Fallback): ${conn.connection.host}`);
      await autoSeed();
    } catch (fallbackError) {
      console.error(`Memory server fallback failed: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
