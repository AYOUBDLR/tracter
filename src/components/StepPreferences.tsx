import React from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, MapPin, Store } from 'lucide-react';
import { UserPreferences } from '../types';
import { POPULAR_DEPARTMENTS } from '../data/mockDeals';

interface StepPreferencesProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  preferences,
  onUpdatePreferences,
  onNext,
  onBack,
}) => {
  const [zipInput, setZipInput] = React.useState(preferences.zipCode);
  const [storeDetected, setStoreDetected] = React.useState('TSC Store #1842 · Dallas/Fort Worth, TX');

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipInput(val);
    onUpdatePreferences({ zipCode: val });
    if (val.length === 5) {
      setStoreDetected(`TSC Store #${val.slice(0, 3)} · Area Local Tractor Supply`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-9 relative overflow-hidden">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">Step 1 of 3</span>
            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#CC0000] rounded-full" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">
            Preference Customization
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Tailor Your $750 Voucher
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose which category you plan to use your $750 promotion on to calibrate your deal package.
          </p>
        </div>

        {/* Department Grid */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            Primary Shopping Category:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {POPULAR_DEPARTMENTS.map((dept) => {
              const isSelected = preferences.department === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ department: dept.id })}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-[#CC0000] bg-red-50/60 ring-2 ring-red-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#CC0000] text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {dept.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {dept.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shopping Channel & Frequency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Where do you shop?
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['both', 'instore', 'online'] as const).map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => onUpdatePreferences({ shoppingChannel: channel })}
                  className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                    preferences.shoppingChannel === channel
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {channel === 'both' ? 'Both' : channel === 'instore' ? 'In-Store' : 'Online'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Nearest Store Zip Code:
            </label>
            <div className="relative">
              <input
                type="text"
                value={zipInput}
                onChange={handleZipChange}
                placeholder="e.g. 75201"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#CC0000] focus:ring-2 focus:ring-red-100 outline-hidden font-medium"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Store detection notice */}
        <div className="mb-8 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900">
          <Store className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Designated redemption location: <strong>{storeDetected}</strong> (Barcode also eligible for TractorSupply.com online checkout).
          </span>
        </div>

        {/* Continue Button */}
        <div>
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 rounded-full bg-[#CC0000] hover:bg-[#a80000] active:scale-[0.99] text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all cursor-pointer"
          >
            <span>Confirm Preference & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
