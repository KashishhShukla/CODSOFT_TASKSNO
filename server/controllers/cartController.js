import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveCart = async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ user: req.user._id, items });
    }

    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
