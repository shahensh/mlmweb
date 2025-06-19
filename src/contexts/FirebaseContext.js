import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set, update, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../firebase';

const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const usersRef = ref(database, 'users');
    const productsRef = ref(database, 'products');
    const settingsRef = ref(database, 'settings');

    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(usersList);
      }
    });

    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProducts(productsList);
      }
    });

    const unsubscribeSettings = onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
      unsubscribeSettings();
    };
  }, []);

  // User management functions
  const addUser = async (userData) => {
    const usersRef = ref(database, 'users');
    const newUserRef = ref(database, 'users/' + Date.now());
    await set(newUserRef, userData);
  };

  const updateUser = async (userId, userData) => {
    const userRef = ref(database, `users/${userId}`);
    await update(userRef, userData);
  };

  const deleteUser = async (userId) => {
    const userRef = ref(database, `users/${userId}`);
    await remove(userRef);
  };

  // Product management functions
  const addProduct = async (productData) => {
    const productsRef = ref(database, 'products');
    const newProductRef = ref(database, 'products/' + Date.now());
    await set(newProductRef, productData);
  };

  const updateProduct = async (productId, productData) => {
    const productRef = ref(database, `products/${productId}`);
    await update(productRef, productData);
  };

  const deleteProduct = async (productId) => {
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef);
  };

  // Settings management functions
  const updateSettings = async (settingsData) => {
    const settingsRef = ref(database, 'settings');
    await update(settingsRef, settingsData);
  };

  const value = {
    users,
    products,
    settings,
    loading,
    currentUser,
    addUser,
    updateUser,
    deleteUser,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSettings,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}; 