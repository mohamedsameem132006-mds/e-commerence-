import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const cartRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cart/${currentUser.uid}`);
          if (cartRes.ok) {
            const data = await cartRes.json();
            setCart(data);
          }
          const favRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/favorites/${currentUser.uid}`);
          if (favRes.ok) {
            const favData = await favRes.json();
            setFavorites(favData);
          }
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      } else {
        setCart([]);
        setFavorites([]);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = useCallback(async (product, qty = 1) => {
    let newQuantity = qty;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        newQuantity = (existingItem.quantity || existingItem.qty || 1) + qty;
        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: newQuantity } : item);
      }
      return [...prevCart, { ...product, quantity: qty }];
    });

    if (user) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, product, quantity: newQuantity })
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const removeFromCart = useCallback(async (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (user) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cart/remove`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, product_id: productId })
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const clearCart = useCallback(async () => {
    setCart([]);
    if (user) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/cart/clear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid })
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const toggleFavorite = useCallback(async (productId) => {
    let isFavoriteNow = false;
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      }
      isFavoriteNow = true;
      return [...prevFavorites, productId];
    });

    if (user) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/favorites/toggle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, product_id: productId, isFavorite: isFavoriteNow })
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
  const favoriteCount = favorites.length;

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        clearCart,
        toggleFavorite,
        cartCount,
        favoriteCount,
        user,
        loadingAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
