export interface DealItem {
  id: string;
  title: string;
  partner: string;
  category: 'Free Trial' | 'App Download' | 'Quick Survey' | 'Subscription' | 'Banking';
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  rewardValue: string;
  timeEstimate: string;
  description: string;
  requirements: string;
  completed: boolean;
  featured?: boolean;
}

export interface UserPreferences {
  department: string;
  frequency: string;
  shoppingChannel: 'both' | 'instore' | 'online';
  zipCode: string;
  email: string;
  deliveryMethod: 'digital_barcode' | 'apple_wallet' | 'printable_pdf';
}

export interface CampaignData {
  campaignId: string;
  name: string;
  network: string;
  payoutModel: string;
  revShare: string;
  targetGeo: string;
  vertical: string;
  approvedStatus: string;
  offerAmount: number;
}
