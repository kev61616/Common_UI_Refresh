"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Star } from 'lucide-react';

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: Array<{
    name: string;
    included: boolean;
    description?: string;
    highlight?: boolean;
  }>;
  limits?: {
    coursesPerMonth?: number;
    practiceTestsPerMonth?: number;
    storageLimit?: number;
    concurrentDevices?: number;
  };
  recommended?: boolean;
}

interface PlanComparisonTableProps {
  plans: Plan[];
  currentPlanId: string;
  onSelectPlan: (planId: string) => void;
  className?: string;
}

const PlanComparisonTable: React.FC<PlanComparisonTableProps> = ({
  plans,
  currentPlanId,
  onSelectPlan,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ${className}`}>
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`p-6 flex flex-col relative overflow-hidden transition-all duration-200 
            ${plan.id === currentPlanId ? 'border-primary ring-1 ring-primary shadow-md' : 'hover:shadow-md hover:border-primary/30'}
            ${plan.recommended ? 'md:transform md:scale-105 md:z-10' : ''}`
          }
        >
          {/* Recommended badge */}
          {plan.recommended && (
            <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-0">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-4 py-1 font-semibold shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>RECOMMENDED</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Plan header */}
          <div className={`mb-4 ${plan.recommended ? 'pt-6' : ''}`}>
            <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
            <div className="flex items-end gap-1 mt-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground mb-1">{plan.period}</span>
            </div>
          </div>
          
          {/* Plan features */}
          <div className="flex-1">
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li 
                  key={index} 
                  className={`flex items-start gap-2 text-sm ${feature.highlight ? 'font-medium' : ''}`}
                >
                  {feature.included ? (
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className={!feature.included ? "text-muted-foreground" : ""}>
                      {feature.name}
                    </span>
                    {feature.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Plan limits */}
            {plan.limits && (
              <div className="border-t border-border pt-4 mb-6">
                <p className="font-medium text-sm mb-2">Plan Limits</p>
                <ul className="space-y-2">
                  {plan.limits.coursesPerMonth !== undefined && (
                    <li className="text-sm text-muted-foreground">
                      <span className="inline-block w-6 text-center mr-1">
                        {plan.limits.coursesPerMonth === Infinity ? '∞' : plan.limits.coursesPerMonth}
                      </span>
                      courses per month
                    </li>
                  )}
                  {plan.limits.practiceTestsPerMonth !== undefined && (
                    <li className="text-sm text-muted-foreground">
                      <span className="inline-block w-6 text-center mr-1">
                        {plan.limits.practiceTestsPerMonth === Infinity ? '∞' : plan.limits.practiceTestsPerMonth}
                      </span>
                      practice tests per month
                    </li>
                  )}
                  {plan.limits.storageLimit !== undefined && (
                    <li className="text-sm text-muted-foreground">
                      <span className="inline-block w-6 text-center mr-1">
                        {plan.limits.storageLimit === Infinity ? '∞' : plan.limits.storageLimit}
                      </span>
                      GB storage
                    </li>
                  )}
                  {plan.limits.concurrentDevices !== undefined && (
                    <li className="text-sm text-muted-foreground">
                      <span className="inline-block w-6 text-center mr-1">
                        {plan.limits.concurrentDevices === Infinity ? '∞' : plan.limits.concurrentDevices}
                      </span>
                      concurrent devices
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          {/* Action button */}
          <div className="mt-auto pt-4">
            {plan.id === currentPlanId ? (
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
                Current Plan
              </Button>
            ) : (
              <Button 
                className={`w-full group ${plan.recommended ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' : ''}`}
                variant={plan.recommended ? 'default' : 'outline'}
                onClick={() => onSelectPlan(plan.id)}
              >
                <span>{currentPlanId === 'free' ? 'Subscribe' : 'Upgrade'}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PlanComparisonTable;
