import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Globe, 
  Zap, 
  Layers, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Database
} from 'lucide-react';

interface ChannelStatus {
  name: string;
  type: string;
  status: 'synced' | 'syncing' | 'warning';
  activeListings: number;
  revenueToday: number;
  lastSync: string;
  color: string;
}

interface OrderEvent {
  id: string;
  channel: string;
  item: string;
  amount: number;
  customerLocation: string;
  status: 'Fulfilled' | 'Processing' | 'Synced';
  timestamp: string;
}

export const MultiChannelSyncDashboard: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  
  const [channels, setChannels] = useState<ChannelStatus[]>([
    { name: 'Payhip Store', type: 'Digital Products', status: 'synced', activeListings: 14, revenueToday: 149.00, lastSync: '1 min ago', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
    { name: 'Shopify Store', type: 'Direct Storefront', status: 'synced', activeListings: 42, revenueToday: 420.50, lastSync: '3 mins ago', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'WooCommerce', type: 'WordPress Site', status: 'synced', activeListings: 28, revenueToday: 185.00, lastSync: '2 mins ago', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { name: 'Amazon Marketplace', type: 'FBA / Direct', status: 'synced', activeListings: 19, revenueToday: 310.00, lastSync: '5 mins ago', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { name: 'Gumroad', type: 'Digital Memberships', status: 'synced', activeListings: 8, revenueToday: 95.00, lastSync: '4 mins ago', color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
    { name: 'Stripe Direct', type: 'Custom Checkout', status: 'synced', activeListings: 12, revenueToday: 230.00, lastSync: 'Just now', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  ]);

  const [orders, setOrders] = useState<OrderEvent[]>([
    { id: 'ORD-9821', channel: 'Payhip', item: 'Local SEO Booster Kit', amount: 29.00, customerLocation: 'London, UK', status: 'Fulfilled', timestamp: '2 mins ago' },
    { id: 'ORD-9820', channel: 'Shopify', item: 'AI Prompt Bundle v2', amount: 49.00, customerLocation: 'New York, US', status: 'Fulfilled', timestamp: '5 mins ago' },
    { id: 'ORD-9819', channel: 'WooCommerce', item: 'Micro-SaaS Starter Pack', amount: 99.00, customerLocation: 'Berlin, DE', status: 'Synced', timestamp: '12 mins ago' },
    { id: 'ORD-9818', channel: 'Amazon', item: 'Automation Playbook Hardcopy', amount: 24.50, customerLocation: 'Toronto, CA', status: 'Processing', timestamp: '18 mins ago' },
    { id: 'ORD-9817', channel: 'Gumroad', item: 'Monthly VIP Membership', amount: 15.00, customerLocation: 'Sydney, AU', status: 'Fulfilled', timestamp: '25 mins ago' },
  ]);

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      setChannels(prev => prev.map(c => ({ ...c, lastSync: 'Just now', status: 'synced' })));
    }, 1500);
  };

  const totalRevenue = channels.reduce((acc, c) => acc + c.revenueToday, 0);
  const totalListings = channels.reduce((acc, c) => acc + c.activeListings, 0);

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Real-Time Multi-Channel Synchronization Hub</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span>Unified E-Commerce Command Center</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono px-2.5 py-0.5 rounded-full">
              6/6 Channels Online
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Automated bidirectional sync between Payhip, Shopify, WooCommerce, Amazon, Gumroad, and Stripe.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerManualSync}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Channels...' : 'Sync All Channels Now'}</span>
          </button>
        </div>
      </div>

      {/* Real-time KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Combined Today's Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">£{totalRevenue.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-400/80 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs yesterday
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Synced Active Listings</span>
            <Package className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalListings}</div>
          <div className="text-[11px] text-indigo-300">Across 6 storefronts</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Sync Engine Status</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-cyan-300">100% Operational</div>
          <div className="text-[11px] text-slate-400 font-mono">Latency: 42ms</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Automated Fulfillment</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-300">Instant Webhook</div>
          <div className="text-[11px] text-slate-400">Zero manual data entry</div>
        </div>
      </div>

      {/* Connected Channel Grid */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
          <span>Connected Sales Channels & Real-Time Sync Status</span>
          <span className="text-[11px] text-slate-500 lowercase font-normal">Last global sync: {lastSyncTime}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((channel, idx) => (
            <div key={idx} className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-3 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${channel.color}`}>
                  {channel.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Synced
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[11px] text-slate-400">{channel.type}</div>
                  <div className="text-lg font-bold text-white mt-0.5">£{channel.revenueToday.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-indigo-300">{channel.activeListings} products</div>
                  <div className="text-[10px] text-slate-500 font-mono">Sync: {channel.lastSync}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity & Order Stream */}
      <div className="relative z-10 space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
          <span>Live Multi-Channel Order Feed</span>
          <span className="text-[11px] text-emerald-400 font-mono">SSE Stream Active</span>
        </h3>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="divide-y divide-slate-800/80">
            {orders.map((ord) => (
              <div key={ord.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-indigo-400">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{ord.item}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                        {ord.channel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Order ID: {ord.id} • {ord.customerLocation} • {ord.timestamp}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400 font-mono text-sm">+£{ord.amount.toFixed(2)}</div>
                  <div className="text-[10px] font-semibold text-emerald-400">{ord.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
