"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import PlanComparisonTable from '@/components/user/ui/PlanComparisonTable';
import { Plan } from '@/components/user/ui/PlanComparisonTable';

// Mock data for current subscription
const mockSubscription = {
  id: "sub_123456",
  userId: "current-user",
  plan: "free",
  status: "active",
  startDate: "2025-01-15T00:00:00Z",
  currentPeriodStart: "2025-04-01T00:00:00Z",
  currentPeriodEnd: "2025-05-01T00:00:00Z",
  nextBillingDate: null,
  cancelAtPeriodEnd: false,
  cardLast4: null,
};

// Mock data for available plans
const mockPlans: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "$0",
    period: "forever",
    features: [
      { name: "Basic learning materials", included: true, highlight: true },
      { name: "Limited practice tests", included: true },
      { name: "Performance tracking", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Personalized learning path", included: false },
      { name: "AI-powered recommendations", included: false },
      { name: "Priority support", included: false },
    ],
    limits: {
      coursesPerMonth: 3,
      practiceTestsPerMonth: 5,
      concurrentDevices: 1,
    },
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "$9.99",
    period: "per month",
    recommended: true,
    features: [
      { name: "Basic learning materials", included: true },
      { name: "Unlimited practice tests", included: true, highlight: true },
      { name: "Performance tracking", included: true },
      { name: "Advanced analytics", included: true, highlight: true },
      { name: "Personalized learning path", included: true, highlight: true },
      { name: "AI-powered recommendations", included: false },
      { name: "Priority support", included: false },
    ],
    limits: {
      coursesPerMonth: 10,
      practiceTestsPerMonth: Infinity,
      concurrentDevices: 2,
    },
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$19.99",
    period: "per month",
    features: [
      { name: "Basic learning materials", included: true },
      { name: "Unlimited practice tests", included: true },
      { name: "Performance tracking", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Personalized learning path", included: true },
      { name: "AI-powered recommendations", included: true, highlight: true },
      { name: "Priority support", included: true, highlight: true },
    ],
    limits: {
      coursesPerMonth: Infinity,
      practiceTestsPerMonth: Infinity,
      concurrentDevices: 5,
    },
  },
];

interface SubscriptionContainerProps {
  userId: string;
}

const SubscriptionContainer: React.FC<SubscriptionContainerProps> = ({ userId }) => {
  const [subscription, setSubscription] = useState(mockSubscription);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Get the current plan details
  const currentPlan = mockPlans.find(plan => plan.id === subscription.plan);
  
  // Get included/excluded features for the current plan
  const includedFeatures = currentPlan?.features.filter(f => f.included) || [];
  const excludedFeatures = currentPlan?.features.filter(f => !f.included) || [];
  
  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowConfirmation(true);
    // In a real app, this would open a confirmation modal
    // and then process the upgrade/downgrade
  };

  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Current Subscription</h3>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Active
          </div>
        </div>
        
        <div className="mt-4">
          <h2 className="text-3xl font-bold">{currentPlan?.name}</h2>
          <p className="text-2xl mt-1">${0}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="font-medium mb-3">Included in your plan:</h4>
              <ul className="space-y-2">
                {includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Not included:</h4>
              <ul className="space-y-2">
                {excludedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
        <PlanComparisonTable 
          plans={mockPlans}
          currentPlanId={subscription.plan}
          onSelectPlan={handleSelectPlan}
        />
      </div>
    </div>
  );
};

export default SubscriptionContainer;
