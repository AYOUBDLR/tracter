import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Mail, Smartphone, Printer, QrCode, Shield, CheckCircle } from 'lucide-react';
import { UserPreferences } from '../types';

interface StepEmailProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepEmail: React.FC<StepEmailProps> = ({
  preferences,
  onUpdatePreferences,
  onNext,
  onBack,
}) => {
  const [emailInput, setEmailInput] = useState(preferences.email);
  const [emailError, setEmailError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setEmailError('Please enter a valid email address to receive your $750 code.');
      return;
    }
    if (!agreedTerms) {
      setEmailError('Please accept the promotional rewards terms to proceed.');
      return;
    }
    setEmailError('');
    onUpdatePreferences({ email: cleanEmail });
    onNext();
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
            <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">Step 2 of 3</span>
            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-[#CC0000] rounded-full" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">
            Voucher Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Where Should We Send Your $750 Code?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your unique barcode, redemption instructions, and Tractor Supply PIN will be secured to this email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Recipient Email Address:
            </label>
            <div className="relative">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-3.5 text-base bg-slate-50 border rounded-xl font-medium outline-hidden transition-all ${
                  emailError
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20'
                    : 'border-slate-300 focus:bg-white focus:border-[#CC0000] focus:ring-2 focus:ring-red-100'
                }`}
                autoFocus
              />
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            {emailError && (
              <p className="text-xs font-medium text-red-600 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {emailError}
              </p>
            )}
          </div>

          {/* Delivery Format Option */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Select Preferred Delivery Format:
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'digital_barcode',
                  title: 'Instant In-Browser & Email Barcode Pass',
                  desc: 'Immediate on-screen unlock with copyable promo code and scannable barcode',
                  icon: QrCode,
                },
                {
                  id: 'apple_wallet',
                  title: 'Mobile Wallet Pass (.pkpass)',
                  desc: 'Save directly to Apple Wallet or Google Wallet for tap & scan in-store',
                  icon: Smartphone,
                },
                {
                  id: 'printable_pdf',
                  title: 'Printable In-Store Paper Voucher',
                  desc: 'High-contrast printable 8.5x11 PDF voucher sheet for store cashier',
                  icon: Printer,
                },
              ].map((format) => {
                const Icon = format.icon;
                const isSelected = preferences.deliveryMethod === format.id;
                return (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({
                        deliveryMethod: format.id as any,
                      })
                    }
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#CC0000] bg-red-50/50 ring-2 ring-red-500/20 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#CC0000] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {format.title}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-[#CC0000]" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {format.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compliance Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#CC0000] focus:ring-red-500 w-4 h-4 border-slate-300"
              />
              <span>
                I agree to the Rewards US promotion rules & authorize sending the $750 Tractor Supply voucher verification code to my email address.
              </span>
            </label>
          </div>

          {/* Continue Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#CC0000] hover:bg-[#a80000] active:scale-[0.99] text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              <span>Lock In Email & Proceed to Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your data is strictly confidential · 100% CAN-SPAM compliant</span>
        </div>
      </div>
    </div>
  );
};
