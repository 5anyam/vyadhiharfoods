// 'use client';

// import React, { useState } from 'react';
// import { useAuth } from '../../../lib/auth-context';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(email, password);
//       router.push('/my-account');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full">
//         <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-xl">
//           <h1 className="text-3xl font-bold text-[#5D4E37] mb-6 text-center">Login</h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A574] focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A574] focus:outline-none"
//                 required
//               />
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-lg font-bold hover:from-[#C19A6B] hover:to-[#8B7355] disabled:opacity-50"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-600">
//             Don not have an account?{' '}
//             <Link href="/register" className="text-[#D4A574] font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
