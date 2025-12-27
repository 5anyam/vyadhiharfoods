"use client"
import { useEffect, useState } from "react";
import { X, Package, Calendar, DollarSign, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

const WOOCOMMERCE_CONFIG = {
  BASE_URL: 'https://cms.vyadhiharfoods.com',
  CONSUMER_KEY: 'ck_88a2cfa5c504df33b4c4448fae557a339f26d3d4',
  CONSUMER_SECRET: 'cs_0cb1dbdb63e2e75eb8053a72822470d8341f82ba',
};

interface Order {
  id: number;
  date_created: string;
  total: string;
  status: string;
  line_items: Array<{
    name: string;
    quantity: number;
  }>;
}

interface CancelConfirmation {
  orderId: number | null;
  isOpen: boolean;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState<CancelConfirmation>({ orderId: null, isOpen: false });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);
      
      // Replace with actual customer email from auth context
      const customerEmail = "customer@example.com"; // Get from your auth context
      
      const res = await fetch(
        `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders?customer=${customerEmail}&per_page=50&order=desc`,
        {
          headers: {
            "Authorization": `Basic ${auth}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Failed to load orders. Please refresh the page.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    setCancelingOrderId(orderId);
    
    try {
      const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);
      
      const response = await fetch(
        `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders/${orderId}`,
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
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );

      showToast('Order cancelled successfully!', 'success');
      setCancelConfirm({ orderId: null, isOpen: false });
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast('Failed to cancel order. Please contact support.', 'error');
    } finally {
      setCancelingOrderId(null);
    }
  };

  const canCancelOrder = (status: string): boolean => {
    // Only allow cancellation for pending and processing orders
    return ['pending', 'processing', 'on-hold'].includes(status);
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'on-hold': 'bg-orange-100 text-orange-800 border-orange-200',
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'refunded': 'bg-gray-100 text-gray-800 border-gray-200',
      'failed': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      'pending': 'Pending Payment',
      'processing': 'Processing',
      'on-hold': 'On Hold',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'refunded': 'Refunded',
      'failed': 'Failed',
    };
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#D4A574] animate-spin mx-auto mb-4" />
          <p className="text-[#5D4E37] text-lg font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#5D4E37] mb-2">My Orders</h1>
          <p className="text-gray-600">View and manage your order history</p>
        </div>

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
        {cancelConfirm.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-[#D4A574]/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#5D4E37]">Cancel Order?</h3>
                  <p className="text-sm text-gray-600">Order #{cancelConfirm.orderId}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelConfirm({ orderId: null, isOpen: false })}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  disabled={cancelingOrderId !== null}
                >
                  No, Keep Order
                </button>
                <button
                  onClick={() => handleCancelOrder(cancelConfirm.orderId!)}
                  disabled={cancelingOrderId !== null}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cancelingOrderId === cancelConfirm.orderId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    'Yes, Cancel Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-[#D4A574]/30">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#5D4E37] mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white font-semibold rounded-lg hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg border-2 border-[#D4A574]/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-[#D4A574]/10 to-[#C19A6B]/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Order ID
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Total
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FFF8DC]/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-[#5D4E37]">#{order.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(order.date_created)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            {order.line_items.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="truncate max-w-xs">
                                {item.name} × {item.quantity}
                              </div>
                            ))}
                            {order.line_items.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{order.line_items.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-[#5D4E37] text-lg">₹{parseFloat(order.total).toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border-2 ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {canCancelOrder(order.status) ? (
                            <button
                              onClick={() => setCancelConfirm({ orderId: order.id, isOpen: true })}
                              disabled={cancelingOrderId === order.id}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {cancelingOrderId === order.id ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Cancelling...
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4" />
                                  Cancel
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-sm text-gray-400 font-medium">No action</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#D4A574]/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order ID</p>
                      <p className="font-bold text-[#5D4E37] text-lg">#{order.id}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border-2 ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-[#D4A574]" />
                      {formatDate(order.date_created)}
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <Package className="w-4 h-4 text-[#D4A574] mt-0.5" />
                      <div className="flex-1">
                        {order.line_items.map((item, idx) => (
                          <div key={idx} className="truncate">
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-600 font-medium">Total Amount</span>
                      <span className="font-bold text-[#5D4E37] text-xl">₹{parseFloat(order.total).toFixed(2)}</span>
                    </div>
                  </div>

                  {canCancelOrder(order.status) && (
                    <button
                      onClick={() => setCancelConfirm({ orderId: order.id, isOpen: true })}
                      disabled={cancelingOrderId === order.id}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
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
          </div>
        )}
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
};

export default Dashboard;
