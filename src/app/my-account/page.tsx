// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../lib/auth-context';
// import { useRouter } from 'next/navigation';
// import { Package, Calendar, CreditCard, MapPin } from 'lucide-react';

// interface Order {
//   id: number;
//   order_number: string;
//   status: string;
//   total: string;
//   date: string;
//   payment_method: string;
//   items: Array<{
//     name: string;
//     quantity: number;
//     total: string;
//     image: string;
//   }>;
//   billing: {
//     name: string;
//     address: string;
//     city: string;
//     phone: string;
//   };
// }

// export default function MyAccount() {
//   const { user, token, logout, loading } = useAuth();
//   const router = useRouter();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (user && token) {
//       fetchOrders();
//     }
//   }, [user, token]);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('https://cms.vyadhiharfoods.com/wp-json/vyadhihar/v1/user-orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.orders);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'processing': return 'bg-blue-100 text-blue-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading || loadingOrders) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574]"></div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white py-12 px-4">
//       <div className="max-w-6xl mx-auto">
        
//         {/* User Info Header */}
//         <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 mb-8 shadow-lg">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-[#5D4E37] mb-2">My Account</h1>
//               <p className="text-gray-600">Welcome back, {user.name}!</p>
//               <p className="text-sm text-gray-500">{user.email}</p>
//             </div>
//             <button
//               onClick={logout}
//               className="px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-lg font-semibold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Orders Section */}
//         <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 shadow-lg">
//           <h2 className="text-2xl font-bold text-[#5D4E37] mb-6">My Orders</h2>

//           {orders.length === 0 ? (
//             <div className="text-center py-12">
//               <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-600 mb-4">No orders yet</p>
//               <button
//                 onClick={() => router.push('/')}
//                 className="px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-lg font-semibold"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#D4A574] transition-all">
                  
//                   {/* Order Header */}
//                   <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b">
//                     <div>
//                       <h3 className="text-lg font-bold text-[#5D4E37] mb-2">Order #{order.order_number}</h3>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(order.date).toLocaleDateString()}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <CreditCard className="w-4 h-4" />
//                           {order.payment_method}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//                         {order.status.toUpperCase()}
//                       </span>
//                       <p className="text-2xl font-bold text-[#D4A574] mt-2">₹{order.total}</p>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="space-y-3 mb-4">
//                     {order.items.map((item, idx) => (
//                       <div key={idx} className="flex items-center gap-4">
//                         {item.image && (
//                           <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
//                         )}
//                         <div className="flex-1">
//                           <p className="font-semibold text-gray-900">{item.name}</p>
//                           <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                         </div>
//                         <p className="font-semibold text-[#5D4E37]">₹{item.total}</p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Delivery Address */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex items-start gap-2">
//                       <MapPin className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-semibold text-gray-900">{order.billing.name}</p>
//                         <p className="text-sm text-gray-600">{order.billing.address}, {order.billing.city}</p>
//                         <p className="text-sm text-gray-600">{order.billing.phone}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
