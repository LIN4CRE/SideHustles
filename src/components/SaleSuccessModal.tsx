import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  DollarSign, 
  Award, 
  Share2, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface SaleSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSale: (amountGbp: number, platformName: string, notes: string) => void;
}

export const SaleSuccessModal: React.FC<SaleSuccessModalProps> = ({
  isOpen,
  onClose,
  onConfirmSale
}) => {
  if (!isOpen) return null;

  const [saleAmount, setSaleAmount] = useState<number>(0.10); // Default 10p
  const [platform, setPlatform] = useState<string>('Reddit / Gumroad');
  const [buyerNote, setBuyerNote] = useState<string>('First 10p wallpaper/chime download within 24h!');
  const [isLogged, setIsLogged] = useState<boolean>(false);

  // Trigger confetti burst upon logging
  const fireCelebrationConfetti = () => {
    // Multi-burst fireworks
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#10b981', '#f59e0b', '#6366f1', '#ec4899', '#3b82f6']
      });
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSale(saleAmount, platform, buyerNote);
    setIsLogged(true);
    fireCelebrationConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto relative">
        
        {/* Glow Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-center space-y-3 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-teal-400 p-0.5 mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <Trophy className="w-8 h-8 fill-emerald-400 text-slate-950" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold inline-block">
              24-Hour Challenge Milestone
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {isLogged ? '🎉 1p Sale Challenge Victory!' : 'Log Your First 1p Sale'}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              {isLogged 
                ? 'Congratulations! You proved that getting real-world digital cash velocity in <24h is 100% possible.'
                : 'Enter details of your first 1p - £1.00 transaction to unlock the Day 1 Cash Velocity Champion badge!'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        {!isLogged ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">
                Sale Revenue Amount (£ GBP or $ USD):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0.01, 0.10, 0.49, 1.00].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSaleAmount(amt)}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      saleAmount === amt
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {amt <= 0.01 ? '1p (£0.01)' : amt <= 0.10 ? '10p (£0.10)' : amt <= 0.49 ? '49p (£0.49)' : '£1.00'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">
                Source Channel / Storefront:
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Reddit / Gumroad">Reddit Thread → Gumroad ZIP Download</option>
                <option value="TikTok / PayPal">TikTok Bio → PayPal.me Link</option>
                <option value="Pinterest / Etsy">Pinterest Pin → Etsy / Digital Download</option>
                <option value="Civitai / OpenArt">Civitai → ComfyUI Workflow Sale</option>
                <option value="Discord / Direct">Discord Server → Direct Digital Sale</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">
                Milestone Notes / Customer Feedback:
              </label>
              <input
                type="text"
                value={buyerNote}
                onChange={(e) => setBuyerNote(e.target.value)}
                placeholder="e.g. Buyer downloaded 10p wallpaper zip from r/wallpapers"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Confirm & Fire Fireworks Confetti 🚀</span>
            </button>
          </form>
        ) : (
          <div className="p-6 space-y-5 text-center">
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2">
              <Award className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white font-mono">
                Badge Unlocked: Day 1 Cash Velocity Champion
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                Logged Sale: <strong className="text-emerald-400">£{saleAmount.toFixed(2)}</strong> via {platform}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={fireCelebrationConfetti}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Fire Confetti Again</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
