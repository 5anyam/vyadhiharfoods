'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useRouter } from 'next/navigation';
import { Package, Calendar, CreditCard, MapPin, User, LogOut, ShoppingBag, X, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const WOOCOMMERCE_CONFIG = {
  BASE_URL: 'https://cms.vyadhiharfoods.com',
  CONSUMER_KEY: 'ck_88a2cfa5c504df33b4c4448fae557a339f26d3d4',
  CONSUMER_SECRET: 'cs_0cb1dbdb63e2e75eb8053a72822470d8341f82ba',
};

interface Order {
  id: number;
  order_number: string;
  status: string;
  total: string;
  date: string;
  payment_method: string;
  items: Array<{
    name: string;
    quantity: number;
    total: string;
    image: string;
  }>;
  billing: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };
}

export default function MyAccount() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  // Cancel order states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://cms.vyadhiharfoods.com/wp-json/vyadhihar/v1/user-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Failed to load orders', 'error');
    } finally {
      setLoadingOrders(false);
    }
  };

  const openCancelModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;

    setCancelingOrderId(selectedOrderId);
    
    try {
      const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);
      
      const response = await fetch(
        `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders/${selectedOrderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify({
            status: 'cancelled',
            customer_note: 'Order cancelled by customer',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrderId ? { ...order, status: 'cancelled' } : order
        )
      );

      showToast('Order cancelled successfully!', 'success');
      closeCancelModal();
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast('Failed to cancel order. Please contact support.', 'error');
    } finally {
      setCancelingOrderId(null);
    }
  };

  const canCancelOrder = (status: string): boolean => {
    return ['pending', 'processing', 'on-hold'].includes(status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      case 'on-hold': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'failed': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (authLoading || loadingOrders) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl border-2 animate-slide-in ${
            toast.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#5D4E37] mb-2">Cancel Order?</h3>
                <p className="text-gray-600">
                  Are you sure you want to cancel this order?
                </p>
                <p className="text-sm text-red-600 mt-2 font-medium">
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  disabled={cancelingOrderId !== null}
                >
                  No, Keep It
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelingOrderId !== null}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cancelingOrderId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Yes, Cancel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Info Header */}
        <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#5D4E37] mb-1">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-7 h-7 text-[#D4A574]" />
            <h2 className="text-2xl font-bold text-[#5D4E37]">My Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">No orders yet</p>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-lg font-semibold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#D4A574] hover:shadow-lg transition-all"
                >
                  
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 mb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-lg font-bold text-[#5D4E37] mb-2">
                        Order #{order.order_number}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {order.payment_method}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-2xl font-bold text-[#D4A574]">₹{order.total}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#5D4E37]">₹{item.total}</p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          {order.billing.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.billing.address}, {order.billing.city}, {order.billing.state}
                        </p>
                        <p className="text-sm text-gray-600">{order.billing.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ CANCEL BUTTON */}
                  {canCancelOrder(order.status) && (
                    <button
                      onClick={() => openCancelModal(order.id)}
                      disabled={cancelingOrderId === order.id}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancelingOrderId === order.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Cancelling Order...
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          Cancel Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
