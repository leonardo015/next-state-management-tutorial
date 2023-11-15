"use client";
import type { Cart } from "@/api/types";
import React, { createContext, useState } from "react";

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

export const CartContext = createContext<ReturnType<
	typeof useCartState
> | null>(null);

const CartProvider = ({
	cart: initialCart,
	children,
}: {
	cart: Cart;
	children: React.ReactNode;
}) => {
	const [cart, setCart] = useCartState(initialCart);

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const cart = React.useContext(CartContext);
	if (!cart) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return cart;
};

export default CartProvider;
