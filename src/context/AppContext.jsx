import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCart(data.cart || []);
            setFavorites(data.favorites || []);
          } else {
            setCart([]);
            setFavorites([]);
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

  const updateFirestore = async (uid, cartData, favData) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        cart: cartData,
        favorites: favData
      }, { merge: true });
    } catch (err) {
      console.error("Error updating Firestore:", err);
    }
  };

  const addToCart = useCallback(async (product, qty = 1) => {
    setCart((prevCart) => {
      let newCart;
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = (existingItem.quantity || existingItem.qty || 1) + qty;
        newCart = prevCart.map((item) => item.id === product.id ? { ...item, quantity: newQuantity } : item);
      } else {
        newCart = [...prevCart, { ...product, quantity: qty }];
      }
      if (user) updateFirestore(user.uid, newCart, favorites);
      return newCart;
    });
  }, [user, favorites]);

  const removeFromCart = useCallback(async (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      if (user) updateFirestore(user.uid, newCart, favorites);
      return newCart;
    });
  }, [user, favorites]);

  const clearCart = useCallback(async () => {
    setCart([]);
    if (user) updateFirestore(user.uid, [], favorites);
  }, [user, favorites]);

  const toggleFavorite = useCallback(async (productId) => {
    setFavorites((prevFavorites) => {
      let newFavorites;
      if (prevFavorites.includes(productId)) {
        newFavorites = prevFavorites.filter((id) => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      if (user) updateFirestore(user.uid, cart, newFavorites);
      return newFavorites;
    });
  }, [user, cart]);

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
