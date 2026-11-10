import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, Sparkles, ExternalLink, ShieldCheck, AlertCircle, Award } from 'lucide-react';
import { DealItem } from '../types';

interface StepDealsProps {
  deals: DealItem[];
  onToggleDeal: (id: string) => void;
  onCompleteAllDeals: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepDeals: React.FC<StepDealsProps> = ({
  deals,
  onToggleDeal,
  onCompleteAllDeals,
  onNext,
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Quick Survey' | 'Free Trial' | 'App Download' | 'Banking'>('all');
  const [activeDealModal, setActiveDealModal] = useState<DealItem | null>(null);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const completedCount = deals.filter((d) => d.completed).length;
  const isTargetMet = completedCount >= 3;

  const filteredDeals = activeFilter === 'all'
    ? deals
    : deals.filter((d) => d.category === activeFilter);

  const handleSimulateDeal = (deal: DealItem) => {
    setSimulatingId(deal.id);
    setTimeout(() => {
      onToggleDeal(deal.id);
      setSimulatingId(null);
      if (activeDealModal?.id === deal.id) {
        setActiveDealModal(null);
      }
    }, 900);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-9 relative overflow-hidden">
        
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">Step 3 of 3</span>
            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#CC0000] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedCount / 3) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">
              Deal Verification Hub
            </span>
            <span className="text-xs font-bold text-slate-500">
              Need 3 Deals · Completed: <strong className="text-slate-900">{completedCount}</strong>/3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Complete 3 Deals to Claim $750
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sponsored partner promotions fund your Tractor Supply gift voucher. Select and complete 3 featured deals below.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className={`p-4 rounded-2xl mb-6 border transition-all ${
          isTargetMet
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
            : 'bg-red-50/70 border-red-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                isTargetMet ? 'bg-emerald-600 text-white' : 'bg-[#CC0000] text-white'
              }`}>
                {isTargetMet ? <CheckCircle2 className="w-6 h-6" /> : `${completedCount}/3`}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isTargetMet ? '🎉 Deals Requirement Met!' : 'Deal Progress: Incomplete'}
                </h4>
                <p className="text-xs text-slate-600">
                  {isTargetMet
                    ? 'Your $750 Tractor Supply voucher code and digital barcode are unlocked!'
                    : `Complete ${3 - completedCount} more deal${3 - completedCount > 1 ? 's' : ''} to unlock your promo code.`}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {!isTargetMet && (
                <button
                  type="button"
                  onClick={onCompleteAllDeals}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-red-300 hover:border-red-500 text-[#CC0000] rounded-lg transition-colors shadow-2xs"
                  title="Test convenience: automatically marks 3 deals verified"
                >
                  Quick Test: Complete 3
                </button>
              )}
            </div>
          </div>

          {/* Progress dots */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-red-200/60">
            {[1, 2, 3].map((slot) => {
              const done = completedCount >= slot;
              return (
                <div
                  key={slot}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    done
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white/80 text-slate-500 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Deal #{slot} {done ? 'Verified' : 'Pending'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
          {(['all', 'Quick Survey', 'Free Trial', 'App Download', 'Banking'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeFilter === cat
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Deals' : cat}
            </button>
          ))}
        </div>

        {/* Deals List */}
        <div className="space-y-3 mb-8">
          {filteredDeals.map((deal) => {
            const isSimulating = simulatingId === deal.id;
            return (
              <div
                key={deal.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  deal.completed
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {deal.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {deal.tier}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {deal.timeEstimate}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {deal.description}
                  </p>
                  <p className="text-[11px] text-[#CC0000] font-medium mt-1">
                    Requirement: {deal.requirements}
                  </p>
                </div>

                {/* Action button */}
                <div className="shrink-0 w-full sm:w-auto">
                  {deal.completed ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 w-full sm:w-auto justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Deal Verified</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleDeal(deal.id)}
                        className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                      >
                        Undo
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isSimulating}
                      onClick={() => handleSimulateDeal(deal)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#CC0000] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group"
                    >
                      {isSimulating ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </span>
                      ) : (
                        <>
                          <span>Claim & Verify</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Step 4 */}
        <div>
          <button
            type="button"
            disabled={!isTargetMet}
            onClick={onNext}
            className={`w-full py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isTargetMet
                ? 'bg-[#CC0000] hover:bg-[#a80000] text-white shadow-lg shadow-red-600/30 active:scale-[0.99] animate-pulse-subtle'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>
              {isTargetMet ? 'Unlock $750 Unique Code & Barcode Voucher →' : `Complete ${3 - completedCount} More Deals to Unlock`}
            </span>
          </button>
        </div>

        {/* Security / Terms Notice */}
        <div className="mt-5 text-center text-[11px] text-slate-400">
          Deals are tracked via Rewards US secure conversion pixels. Once confirmed, you will instantly receive the 16-digit voucher and cashier scan code.
        </div>
      </div>
    </div>
  );
};
