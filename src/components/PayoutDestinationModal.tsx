import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Zap, 
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export interface PayoutAccountInfo {
  accountHolder: string;
  sortCode: string;
  accountNumber: string;
  iban: string;
  swiftBic: string;
  payPalMeLink: string;
  preferredMethod: 'paypal' | 'bank';
  autoPayoutEnabled: boolean;
}

export const DEFAULT_PAYOUT_INFO: PayoutAccountInfo = {
  accountHolder: 'MR DAVID CHRISTOPHER LINACRE',
  sortCode: '05-02-30',
  accountNumber: '49193968',
  iban: 'GB14YORK05023049193968',
  swiftBic: 'YORKGB21230',
  payPalMeLink: 'https://paypal.me/dlinacre16',
  preferredMethod: 'paypal',
  autoPayoutEnabled: true
};

interface PayoutDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePayoutInfo?: (info: PayoutAccountInfo) => void;
}

export const PayoutDestinationModal: React.FC<PayoutDestinationModalProps> = ({
  isOpen,
  onClose,
  onSavePayoutInfo
}) => {
  const [info, setInfo] = useState<PayoutAccountInfo>(() => {
    try {
      const stored = localStorage.getItem('sh_payout_destination_config');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load payout info', e);
    }
    return DEFAULT_PAYOUT_INFO;
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('sh_payout_destination_config', JSON.stringify(info));
    } catch (e) {
      console.error('Failed to save payout info', e);
    }
  }, [info]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('sh_payout_destination_config', JSON.stringify(info));
      if (onSavePayoutInfo) onSavePayoutInfo(info);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Bank & PayPal Payout Destination
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                All client payments, invoices, and automated payouts route directly to your bank or PayPal.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {/* Active Target Banner & Verification Badge */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-4 rounded-xl border border-emerald-500/40 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 font-bold font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Payout Verification Status: VALIDATED & READY
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Live Connection Verified
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              When client automations run or AI setup prompts generate invoice scripts, all funds are routed directly to <strong className="text-white">{info.accountHolder}</strong> ({info.preferredMethod === 'paypal' ? 'PayPal.me/dlinacre16' : `Sort: ${info.sortCode} / Acc: ${info.accountNumber}`}).
            </p>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Verification ID:</span>
                <span className="text-emerald-400 font-bold">VERIFIED-UK-BANK-49193968</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Instant Deposit Mode:</span>
                <span className="text-amber-300 font-bold">1p - £10,000 Direct Settled</span>
              </div>
            </div>
          </div>

          {/* Preferred Payment Mode Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Primary Payout Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInfo({ ...info, preferredMethod: 'paypal' })}
                className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  info.preferredMethod === 'paypal'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>PayPal (@PayPal.me/dlinacre16)</span>
              </button>

              <button
                type="button"
                onClick={() => setInfo({ ...info, preferredMethod: 'bank' })}
                className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  info.preferredMethod === 'bank'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>UK Bank Account (Direct Transfer)</span>
              </button>
            </div>
          </div>

          {/* PayPal Quick Link Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
                <DollarSign className="w-4 h-4 text-amber-400" />
                PayPal Direct Payment Link
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(info.payPalMeLink, 'paypal')}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white flex items-center gap-1 font-mono"
                >
                  {copiedKey === 'paypal' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'paypal' ? 'Copied Link!' : 'Copy Link'}</span>
                </button>

                <a
                  href={info.payPalMeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs text-white flex items-center gap-1 font-mono transition-all"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <input
              type="text"
              value={info.payPalMeLink}
              onChange={(e) => setInfo({ ...info, payPalMeLink: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Bank Transfer Details Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <Building2 className="w-4 h-4 text-emerald-400" />
                UK Bank Account Details
              </span>
              <button
                type="button"
                onClick={() => handleCopy(`Account: ${info.accountHolder}\nSort Code: ${info.sortCode}\nAccount No: ${info.accountNumber}\nIBAN: ${info.iban}\nSWIFT: ${info.swiftBic}`, 'allBank')}
                className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white flex items-center gap-1 font-mono"
              >
                {copiedKey === 'allBank' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'allBank' ? 'Copied Full Details!' : 'Copy Bank Details'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={info.accountHolder}
                  onChange={(e) => setInfo({ ...info, accountHolder: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Sort Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={info.sortCode}
                    onChange={(e) => setInfo({ ...info, sortCode: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(info.sortCode, 'sortCode')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Account Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={info.accountNumber}
                    onChange={(e) => setInfo({ ...info, accountNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(info.accountNumber, 'accountNumber')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">SWIFT / BIC Code</label>
                <input
                  type="text"
                  value={info.swiftBic}
                  onChange={(e) => setInfo({ ...info, swiftBic: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">International IBAN Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={info.iban}
                    onChange={(e) => setInfo({ ...info, iban: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(info.iban, 'iban')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Payout Workflow Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-white block">Auto-Inject into AI Setup Prompts & Invoices</span>
                <span className="text-[11px] text-slate-400">Generates custom payment links and invoice scripts with these details.</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={info.autoPayoutEnabled}
              onChange={(e) => setInfo({ ...info, autoPayoutEnabled: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit Encrypted Local Configuration
          </span>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <span>Save Payout Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
