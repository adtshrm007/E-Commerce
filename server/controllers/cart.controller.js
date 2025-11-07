import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId: "guest" });

    if (!cart) {
      cart = new cartModel({
        userId: "guest",
        items: [{ productId, qty }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.items.push({ productId, qty });
      }
    }

    await cart.save();

    const updatedCart = await updateCartTotal(cart._id);

    return res
      .status(200)
      .json({ message: "Cart updated successfully", data: updatedCart });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Server Error", data: err.message });
  }
};

export const updateCartTotal = async (cartId) => {
  const cart = await cartModel.findById(cartId).populate("items.productId");

  if (!cart) return null;

  const totalAmount = cart.items.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + item.qty * price;
  }, 0);

  cart.total = totalAmount;
  await cart.save();

  return cart;
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: "guest" }); //demo user

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    const productIds = cart.items.map((item) => item.productId);

    const products = await Promise.all(
      productIds.map(async (id) => {
        const product = await productModel.findById(id).lean();
        return product;
      })
    );

    const total = products.reduce((sum, product, index) => {
      const qty = cart.items[index].qty || 1;
      return sum + product.price * qty;
    }, 0);

    return res.status(200).json({
      message: "Cart items fetched successfully",
      cart: {
        items: cart.items,
        products,
        total,
      },
    });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return res.status(500).json({
      message: "Server error while fetching cart items",
      error: err.message,
    });
  }
};

export const checkout = async (req, res) => {
  try {
    const userId = "guest"; // demo user
    const cart = await cartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty. Cannot proceed to checkout.",
      });
    }

    let totalAmount = 0;

    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        const itemTotal = product.price * item.qty;
        totalAmount += itemTotal;

        return {
          productId: product._id,
          name: product.name,
          quantity: item.qty,
          price: product.price,
          total: itemTotal,
        };
      })
    );

    const newOrder = new orderModel({
      userId,
      items: orderItems,
      totalAmount,
      status: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save();

    // clear the cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    return res.status(201).json({
      message: "Checkout successful. Order placed!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({
      message: "Server error during checkout",
      error: error.message,
    });
  }
};
