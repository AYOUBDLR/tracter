import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { TscLogo } from './TscLogo';

interface LandingCardProps {
  onStart: () => void;
}

export const LandingCard: React.FC<LandingCardProps> = ({ onStart }) => {
  // Live dynamic claimed count with occasional realistic tick
  const [claimedCount, setClaimedCount] = useState(786);

  useEffect(() => {
    const interval = setInterval(() => {
      setClaimedCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Primary Landing Card matching image_4b310ff2 design and style */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200">
        
        {/* Subtle decorative top glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

        {/* Brand Header */}
        <div className="flex justify-center mb-6 pt-2">
          <TscLogo />
        </div>

        {/* Live Claim Counter Pill (Exact match to image 1) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              <strong className="text-slate-900 font-bold tabular-nums">{claimedCount}+</strong> Shoppers Claimed Today
            </span>
          </div>
        </div>

        {/* Headline (Styled with huge accent text like image 1) */}
        <div className="text-center mb-8">
          <p className="text-lg sm:text-xl font-medium text-slate-600 mb-1">
            Get up to a
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            <span className="text-[#CC0000] italic font-black mr-2 drop-shadow-xs">$750</span>
            Promo Code
          </h1>
        </div>

        {/* Step-by-Step Instructions (Exact structure from image 1) */}
        <div className="space-y-5 mb-9">
          {/* Step 01 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#CC0000] border border-red-200/80 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              01
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-slate-900">
                Tap "Start promotion" below
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Takes less than 1 minute to begin your experience.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#CC0000] border border-red-200/80 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              02
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-slate-900">
                Select Preference & Confirm Email
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Align your voucher code to your favorite store departments.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#CC0000] border border-red-200/80 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              03
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-slate-900">
                Complete 3-4 deals
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Complete 3-4 partner deals to claim your Tractor Supply coupon.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#CC0000] border border-red-200/80 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              04
            </div>
            <div className="pt-0.5">
              <h3 className="text-base font-bold text-slate-900">
                Get Your Unique Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Instant unlock with a visual claim voucher barcode.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Button (Matching large pill button in image 1) */}
        <div className="mb-6">
          <button
            onClick={onStart}
            className="w-full py-4 px-6 rounded-full bg-[#CC0000] hover:bg-[#a80000] active:scale-[0.99] text-white text-lg font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/30 transition-all cursor-pointer group"
          >
            <span>Start promotion</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust & Verification Badges */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-bit Secure Verification</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Limited Daily Codes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#CC0000]" />
            <span>No Purchase Obligation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
