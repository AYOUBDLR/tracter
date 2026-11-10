import React, { useState } from 'react';
import { X, MapPin, Search, Phone, Clock, CheckCircle2, Navigation } from 'lucide-react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStore?: (storeName: string) => void;
}

const TSC_STORES = [
  {
    id: 'store-1428',
    name: 'Tractor Supply Co. #1428',
    address: '8401 Boulevard 26, North Richland Hills, TX 76180',
    distance: '3.8 miles',
    phone: '(817) 581-2290',
    hours: 'Mon-Sat: 8AM - 9PM · Sun: 9AM - 7PM',
    services: ['Curbside Pickup', 'Trailer Rental', 'Pet Wash', 'Propane Refill'],
  },
  {
    id: 'store-0651',
    name: 'Tractor Supply Co. #0651',
    address: '1720 E Broad St, Mansfield, TX 76063',
    distance: '11.4 miles',
    phone: '(817) 473-1994',
    hours: 'Mon-Sat: 8AM - 9PM · Sun: 9AM - 7PM',
    services: ['Curbside Pickup', 'Pet Wash', 'Feed Bulk Order'],
  },
  {
    id: 'store-1192',
    name: 'Tractor Supply Co. #1192',
    address: '2200 S Stemmons Fwy, Sanger, TX 76266',
    distance: '18.2 miles',
    phone: '(940) 458-7441',
    hours: 'Mon-Sat: 8AM - 9PM · Sun: 9AM - 7PM',
    services: ['Trailer Rental', 'Propane Refill', 'Power Equipment Service'],
  },
  {
    id: 'store-0419',
    name: 'Tractor Supply Co. #0419',
    address: '540 S Main St, Weatherford, TX 76086',
    distance: '24.7 miles',
    phone: '(817) 594-5441',
    hours: 'Mon-Sat: 8AM - 9PM · Sun: 9AM - 7PM',
    services: ['Full Ranch & Livestock Supply', 'Drive-Thru Feed Loading'],
  },
];

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  onSelectStore,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(TSC_STORES[0].id);

  if (!isOpen) return null;

  const filtered = TSC_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-[#CC0000]" />
          <h2 className="text-xl font-bold text-slate-900">
            Find Nearby Tractor Supply Co.
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          All 2,200+ Tractor Supply stores in the United States accept the Rewards US $750 digital voucher barcode and promo codes at checkout.
        </p>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by City, State, or Zip Code..."
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#CC0000] focus:ring-2 focus:ring-red-100 outline-hidden font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Stores list */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {filtered.map((store) => {
            const isSelected = selectedId === store.id;
            return (
              <div
                key={store.id}
                onClick={() => {
                  setSelectedId(store.id);
                  if (onSelectStore) onSelectStore(store.name);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#CC0000] bg-red-50/40 ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {store.name}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Barcode Accepted
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {store.address}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 shrink-0">
                    {store.distance}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{store.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Confirm Store Selection
          </button>
        </div>
      </div>
    </div>
  );
};
