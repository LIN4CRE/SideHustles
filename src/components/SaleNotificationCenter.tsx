import React, { useState, useEffect } from 'react';
import { PoundSterling, Sparkles, X, TrendingUp, Bell, CheckCircle2, DollarSign } from 'lucide-react';

interface SaleEvent {
  id: string;
  item: string;
  amount: number;
  platform: string;
  timestamp: string;
}

interface SaleNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaleNotificationCenter: React.FC<SaleNotificationCenterProps> = ({
  isOpen,
  onClose
}) => {
  const [sales, setSales] = useState<SaleEvent[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<SaleEvent | null>(null);

  // Fetch recent sales
  const fetchSales = async () => {
    try {
      const res = await fetch('/api/sales/recent');
      if (res.ok) {
        const data = await res.json();
        setSales(data.sales || []);
        setTotalRevenue(data.totalRevenue || 0);
      }
    } catch (e) {
      console.log('Using local fallback sales feed');
    }
  };

  useEffect(() => {
    fetchSales();
    const interval = setInterval(fetchSales, 5000);
    return () => clearInterval(interval);
  }, []);

  // Connect to SSE Live Stream
  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/sales/live-stream');
      eventSource.onmessage = (e) => {
        try {
          const newSale: SaleEvent = JSON.parse(e.data);
          setSales(prev => [newSale, ...prev]);
          setTotalRevenue(prev => prev + newSale.amount);
          setActiveToast(newSale);

          // Play subtle web audio notification chime
          try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
          } catch (err) {
            // Audio context not allowed or unsupported
          }

          setTimeout(() => setActiveToast(null), 5000);
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };
    } catch (err) {
      console.log('SSE Live stream connection unavailable');
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  const triggerTestSimulatedSale = async () => {
    const testItems = [
      { item: '50 AI Solopreneur Prompt Vault', amount: 2.99, platform: 'Gumroad' },
      { item: '4K OLED Cyberpunk Neon Wallpaper', amount: 1.99, platform: 'Etsy' },
      { item: 'Local SEO Meta Description Audit', amount: 25.00, platform: 'Direct PayPal' },
      { item: 'ChatGPT Coding Cheatsheet', amount: 1.49, platform: 'Gumroad' }
    ];
    const randomItem = testItems[Math.floor(Math.random() * testItems.length)];
    try {
      await fetch('/api/webhooks/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(randomItem)
      });
      fetchSales();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* FLOATING SALE TOAST NOTIFICATION */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/50 text-white p-4 rounded-2xl shadow-2xl shadow-emerald-500/20 max-w-sm w-full animate-bounce flex items-center justify-between gap-3 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <PoundSterling className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                NEW SALE RECEIVED!
              </div>
              <div className="text-sm font-bold text-white line-clamp-1">{activeToast.item}</div>
              <div className="text-xs text-slate-300 font-mono">
                +£{activeToast.amount.toFixed(2)} via <span className="text-emerald-400">{activeToast.platform}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LIVE SALES MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl shadow-emerald-500/10 text-slate-100 overflow-hidden">
            
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Bell className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Live Payout & Sales Notification Center
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time webhook listener connected to Gumroad, Stripe, PayPal, and n8n workflows.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Total Accumulated Revenue */}
              <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-950 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Studio Revenue Logged</span>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">£{totalRevenue.toFixed(2)}</div>
                </div>
                <button
                  onClick={triggerTestSimulatedSale}
                  className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Test Sale Notification
                </button>
              </div>

              {/* Webhook Endpoint Info */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-indigo-300">Live Webhook Listener URL:</div>
                <code className="text-[11px] text-amber-300 font-mono bg-slate-900 px-2 py-1 rounded block">
                  http://localhost:3847/api/webhooks/sale
                </code>
                <div className="text-[11px] text-slate-400">
                  Paste this URL in Gumroad ➔ Settings ➔ Advanced ➔ Ping / Webhook URL to receive live desktop sound alerts for every sale!
                </div>
              </div>

              {/* Sales List */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Payout Log:</h3>
                {sales.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 border border-slate-800/60 rounded-xl">
                    Waiting for incoming sales... (Your webhook listener is active)
                  </div>
                ) : (
                  sales.map((sale) => (
                    <div key={sale.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                          £
                        </div>
                        <div>
                          <div className="font-bold text-white">{sale.item}</div>
                          <div className="text-[11px] text-slate-400">{new Date(sale.timestamp).toLocaleTimeString()} • {sale.platform}</div>
                        </div>
                      </div>
                      <div className="font-bold text-emerald-400 font-mono text-sm">+£{sale.amount.toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>

            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Close Notification Center
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
