
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  interval: string;
  interval_count: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}
