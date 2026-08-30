import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem('cartItems');
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    const fetchDBCart = async () => {
      if (user) {
        try {
          const { data } = await API.get('/cart');
          if (data && data.length > 0) {
            setCartItems(data);
          } else if (cartItems.length > 0) {
            await API.post('/cart', { items: cartItems });
          }
        } catch (err) {
          console.error('Failed to sync DB cart:', err);
        }
      }
    };
    fetchDBCart();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    if (user) {
      const syncCart = async () => {
        try {
          await API.post('/cart', { items: cartItems });
        } catch (err) {
          console.error('Failed to sync cart:', err);
        }
      };
      const timer = setTimeout(syncCart, 600);
      return () => clearTimeout(timer);
    }
  }, [cartItems, user]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const pId = product._id;
      const existing = prev.find((item) => (item.product === pId || item.product?._id === pId));
      if (existing) {
        return prev.map((item) =>
          (item.product === pId || item.product?._id === pId)
            ? { ...item, qty: Math.min(item.qty + qty, product.countInStock) }
            : item
        );
      }
      return [
        ...prev,
        {
          product: pId,
          title: product.title,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => (item.product !== productId && item.product?._id !== productId)));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        (item.product === productId || item.product?._id === productId) ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 || itemsPrice === 0 ? 0 : 15;
  const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemsCount,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
