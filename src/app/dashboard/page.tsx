"use client"
import { useEffect, useState } from "react";
import { X, Package, Calendar, Loader2, AlertCircle } from "lucide-react";

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

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);
      
      const res = await fetch(
        `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders?per_page=50&order=desc`,
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
      alert('Failed to load orders');
    } finally {
      setLoading(false);
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

      alert('✅ Order cancelled successfully!');
      closeCancelModal();
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('❌ Failed to cancel order. Please contact support.');
    } finally {
      setCancelingOrderId(null);
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'processing': 'bg-blue-100 text-blue-800 border-blue-300',
      'on-hold': 'bg-orange-100 text-orange-800 border-orange-300',
      'completed': 'bg-green-100 text-green-800 border-green-300',
      'cancelled': 'bg-red-100 text-red-800 border-red-300',
      'refunded': 'bg-gray-100 text-gray-800 border-gray-300',
      'failed': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#D4A574] animate-spin mx-auto mb-4" />
          <p className="text-[#5D4E37] text-lg font-semibold">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#5D4E37] mb-2">Dashboard</h1>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>

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
                  Are you sure you want to cancel Order #{selectedOrderId}?
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

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-[#D4A574]/30">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#5D4E37] mb-2">No Orders Yet</h3>
            <p className="text-gray-600">Orders will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#D4A574]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#D4A574] to-[#C19A6B]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FFF8DC]/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#5D4E37] text-lg">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#D4A574]" />
                          {formatDate(order.date_created)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs">
                          {order.line_items?.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="truncate font-medium">
                              • {item.name} (×{item.quantity})
                            </div>
                          ))}
                          {order.line_items && order.line_items.length > 2 && (
                            <span className="text-xs text-[#D4A574] font-semibold">
                              +{order.line_items.length - 2} more items
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#5D4E37] text-xl">
                          ₹{parseFloat(order.total).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-4 py-2 text-xs font-bold rounded-full border-2 uppercase ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {/* ✅ CANCEL BUTTON - SHOWS FOR ALL ORDERS EXCEPT CANCELLED/COMPLETED */}
                        {order.status !== 'cancelled' && order.status !== 'completed' && order.status !== 'refunded' ? (
                          <button
                            onClick={() => openCancelModal(order.id)}
                            disabled={cancelingOrderId === order.id}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X className="w-4 h-4" />
                            Cancel Order
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400 font-medium italic">
                            {order.status === 'cancelled' ? 'Already Cancelled' : 'Cannot Cancel'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile View */}
        <div className="mt-6 md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#D4A574]/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="font-bold text-[#5D4E37] text-xl">#{order.id}</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border-2 uppercase ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-[#D4A574]" />
                  {formatDate(order.date_created)}
                </div>
                
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Items:</p>
                  {order.line_items?.map((item, idx) => (
                    <div key={idx}>• {item.name} (×{item.quantity})</div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">Total</span>
                  <span className="font-bold text-[#5D4E37] text-2xl">₹{parseFloat(order.total).toFixed(2)}</span>
                </div>
              </div>

              {/* ✅ MOBILE CANCEL BUTTON */}
              {order.status !== 'cancelled' && order.status !== 'completed' && order.status !== 'refunded' && (
                <button
                  onClick={() => openCancelModal(order.id)}
                  disabled={cancelingOrderId === order.id}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {cancelingOrderId === order.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cancelling...
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
    </div>
  );
};

export default Dashboard;
