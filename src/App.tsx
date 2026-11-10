/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LandingCard } from './components/LandingCard';
import { StepPreferences } from './components/StepPreferences';
import { StepEmail } from './components/StepEmail';
import { StepDeals } from './components/StepDeals';
import { StepVoucher } from './components/StepVoucher';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { INITIAL_DEALS } from './data/mockDeals';
import { DealItem, UserPreferences } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEALS);
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const [preferences, setPreferences] = useState<UserPreferences>({
    department: 'lawn-garden',
    frequency: 'Monthly',
    shoppingChannel: 'both',
    zipCode: '75201',
    email: '',
    deliveryMethod: 'digital_barcode',
  });

  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const handleToggleDeal = (id: string) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === id ? { ...deal, completed: !deal.completed } : deal
      )
    );
  };

  const handleCompleteAllDeals = () => {
    setDeals((prev) =>
      prev.map((deal, index) =>
        index < 3 ? { ...deal, completed: true } : deal
      )
    );
  };

  const handleReset = () => {
    setCurrentStep(0);
    setDeals(INITIAL_DEALS);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 font-sans selection:bg-[#CC0000] selection:text-white relative p-4 sm:p-6 lg:p-8">
      {/* Background radial gradient subtle styling inspired by reference card backdrop */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(204,0,0,0.06),rgba(255,255,255,0))]" />

      {/* Main Promotion Funnel Container - Centered */}
      <main className="w-full max-w-xl mx-auto relative z-10 my-auto">
        {/* Step 0: Landing Promo Card */}
        {currentStep === 0 && (
          <LandingCard onStart={() => setCurrentStep(1)} />
        )}

        {/* Step 1: Department & Store Preference */}
        {currentStep === 1 && (
          <StepPreferences
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}

        {/* Step 2: Email & Dispatch Format */}
        {currentStep === 2 && (
          <StepEmail
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {/* Step 3: Complete 3-4 Sponsor Deals */}
        {currentStep === 3 && (
          <StepDeals
            deals={deals}
            onToggleDeal={handleToggleDeal}
            onCompleteAllDeals={handleCompleteAllDeals}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {/* Step 4: Unique Code & Visual Barcode Pass */}
        {currentStep === 4 && (
          <StepVoucher
            preferences={preferences}
            onReset={handleReset}
            onOpenStoreLocator={() => setStoreModalOpen(true)}
          />
        )}
      </main>

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
        onSelectStore={() => {
          setStoreModalOpen(false);
        }}
      />
    </div>
  );
}

