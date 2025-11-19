// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   first_name?: string;
//   last_name?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name: string, phone: string) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const WP_API_URL = 'https://cms.vyadhiharfoods.com/wp-json/vyadhihar/v1';

//   useEffect(() => {
//     // Check if user is logged in
//     const savedToken = localStorage.getItem('auth_token');
//     if (savedToken) {
//       verifyToken(savedToken);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const verifyToken = async (savedToken: string) => {
//     try {
//       const response = await fetch(`${WP_API_URL}/verify-token`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: savedToken }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setUser(data.user);
//         setToken(savedToken);
//       } else {
//         localStorage.removeItem('auth_token');
//       }
//     } catch (error) {
//       console.error('Token verification failed:', error);
//       localStorage.removeItem('auth_token');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     const response = await fetch(`${WP_API_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     setUser(data.user);
//     setToken(data.token);
//     localStorage.setItem('auth_token', data.token);
//   };

//   const register = async (email: string, password: string, name: string, phone: string) => {
//     const response = await fetch(`${WP_API_URL}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, name, phone }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     setUser(data.user);
//     setToken(data.token);
//     localStorage.setItem('auth_token', data.token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('auth_token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }
