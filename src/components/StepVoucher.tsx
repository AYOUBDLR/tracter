import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  RefreshCw,
  QrCode,
  ScanLine,
} from 'lucide-react';
import { UserPreferences } from '../types';
import { TscLogo } from './TscLogo';

interface StepVoucherProps {
  preferences: UserPreferences;
  onReset: () => void;
  onOpenStoreLocator: () => void;
}

export const StepVoucher: React.FC<StepVoucherProps> = ({
  preferences,
  onReset,
  onOpenStoreLocator,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanVerified, setScanVerified] = useState(false);

  // Dynamic promo code and PIN
  const promoCode = 'TSC-750-X9K2-8841';
  const voucherPin = '4821';
  const cardNumber = '6045 7820 1928 3847';

  // 48-hour countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 58,
    seconds: 40,
  });

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CC0000', '#FF3333', '#111827', '#E5E7EB', '#F59E0B'],
      });
    } catch (e) {
      // safe fallback
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(voucherPin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2500);
  };

  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanVerified(true);
      setTimeout(() => setScanVerified(false), 3000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Top Notification Banner */}
      <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base">
              Promotion Verification Complete!
            </h3>
            <p className="text-xs text-white/90">
              Your $750 Tractor Supply voucher has been unlocked and dispatched to <strong>{preferences.email || 'your email'}</strong>.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-lg text-xs font-bold shrink-0">
          <Clock className="w-3.5 h-3.5" />
          <span className="tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Official Voucher Card - Styled with Authentic Tractor Supply Red */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/70 border border-slate-200 overflow-hidden relative">
        
        {/* Header Ribbon of the Voucher */}
        <div className="bg-[#CC0000] text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle background texture circles */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-16 w-40 h-40 rounded-full bg-black/10 blur-lg pointer-events-none" />

          <div className="flex items-start justify-between relative z-10 gap-4 mb-6">
            <TscLogo variant="white" />
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/30 text-white text-[11px] font-bold tracking-wide uppercase border border-white/20">
                ✓ Approved & Validated
              </span>
              <div className="text-[10px] text-white/80 font-mono mt-1">
                Ref: TSC-US-5488
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between relative z-10 gap-4 pt-2 border-t border-white/20">
            <div>
              <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                Authorized Value
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                $750.00 <span className="text-base font-bold text-white/80">USD</span>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                Valid Through
              </div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums flex items-center gap-1.5 sm:justify-end">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>
                  {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s remaining
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Body: Code & Barcode */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* 16-Digit Card & Code Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Promo Code Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Digital Promo / Voucher Code
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 tracking-wider">
                  {promoCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedCode
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#CC0000] hover:bg-[#a80000] text-white shadow-xs'
                  }`}
                  title="Copy code to clipboard"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* In-Store Card Security PIN */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Cashier Security PIN
              </span>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 tracking-wider mr-2">
                    {voucherPin}
                  </span>
                  <span className="text-xs text-slate-400">Card: {cardNumber.slice(-4)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPin}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {copiedPin ? 'Copied PIN' : 'Copy PIN'}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Claim Voucher Barcode (Matching image 1 Step 04 requirement) */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-slate-300">
                <ScanLine className="w-4 h-4 text-red-500" />
                <span>Cashier Optical Barcode Scanner</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Format: CODE-128 High-Density
              </span>
            </div>

            {/* The Barcode Visual Strip */}
            <div className="bg-white p-4 rounded-xl relative overflow-hidden shadow-inner flex flex-col items-center justify-center">
              
              {/* Laser scanner effect */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-red-600 shadow-[0_0_12px_#ff0000] top-1/2 -translate-y-1/2 animate-bounce" />
              )}

              {/* Barcode Graphic Stripes */}
              <div className="w-full h-16 barcode-pattern rounded-xs" />
              
              {/* Barcode Numbers Below */}
              <div className="mt-2 font-mono text-xs sm:text-sm tracking-[0.3em] font-bold text-slate-900 select-all">
                *TSC-750-8492048102*
              </div>
            </div>

            {/* Barcode scan simulator action */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                {scanVerified
                  ? '✅ Barcode verified! Cashier checkout approved.'
                  : 'Present screen at checkout or scan at self-service terminal.'}
              </span>
              <button
                type="button"
                onClick={handleScanSimulation}
                disabled={isScanning}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <ScanLine className="w-3.5 h-3.5 text-red-400" />
                <span>{isScanning ? 'Scanning...' : 'Test Scanner'}</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Pass (8.5x11)</span>
            </button>

            <button
              type="button"
              onClick={onOpenStoreLocator}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <MapPin className="w-4 h-4 text-[#CC0000]" />
              <span>Find Nearby Store</span>
            </button>

            <a
              href="https://www.tractorsupply.com"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>TractorSupply.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* How to Redeem In-Store or Online Guide */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Redemption Instructions</span>
            </h4>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>
                <strong>In-Store Cashier:</strong> Present the digital barcode or printed voucher on this page. Cashier scans barcode or keys in Promo Code <code>{promoCode}</code> with PIN <code>{voucherPin}</code>.
              </li>
              <li>
                <strong>Online at TractorSupply.com:</strong> During checkout in the "Gift Cards & Promo Codes" field, enter <code>{promoCode}</code> and apply.
              </li>
              <li>
                <strong>Balance Usage:</strong> Usable across single or multiple purchases until the full $750.00 credit balance is consumed.
              </li>
            </ul>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 sm:p-5 bg-slate-100/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span>Redemption ID: #5488-{Date.now().toString().slice(-6)}</span>
            <span>·</span>
            <span>Verified by Rewards US</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 text-[#CC0000] hover:text-[#9e0000] font-bold text-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
