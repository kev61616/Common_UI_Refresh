"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Trash2, Edit, Star, AlertCircle } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_account';
  brand?: string;
  last4: string;
  expMonth?: number;
  expYear?: number;
  name: string;
  isDefault: boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  paymentMethod,
  onSetDefault,
  onEdit,
  onRemove,
  className = ''
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Get appropriate card icon based on brand
  const getCardIcon = () => {
    // In a real app, we would use specific brand icons
    switch(paymentMethod.brand?.toLowerCase()) {
      case 'visa':
        return <div className="text-blue-600 font-bold text-sm">VISA</div>;
      case 'mastercard':
        return <div className="text-red-500 font-bold text-sm">MC</div>;
      case 'amex':
        return <div className="text-blue-500 font-bold text-sm">AMEX</div>;
      case 'discover':
        return <div className="text-orange-500 font-bold text-sm">DISC</div>;
      default:
        return <CreditCard className="h-5 w-5 text-primary" />;
    }
  };

  // Format expiration date
  const formattedExpiry = paymentMethod.expMonth && paymentMethod.expYear
    ? `${paymentMethod.expMonth.toString().padStart(2, '0')}/${String(paymentMethod.expYear).slice(-2)}`
    : undefined;
    
  // Check if card is expiring soon (within 2 months)
  const isExpiringSoon = () => {
    if (!paymentMethod.expMonth || !paymentMethod.expYear) return false;
    
    const now = new Date();
    const expiryDate = new Date(2000 + parseInt(String(paymentMethod.expYear).slice(-2)), paymentMethod.expMonth);
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(now.getMonth() + 2);
    
    return expiryDate <= twoMonthsFromNow && expiryDate > now;
  };
  
  // Card class based on whether it's default or expiring soon
  const cardClass = paymentMethod.isDefault 
    ? 'border-primary/50 bg-primary/5 shadow-sm' 
    : isExpiringSoon() 
      ? 'border-amber-300 bg-amber-50 shadow-sm' 
      : 'hover:border-gray-300';

  return (
    <div className={`group transition-all duration-200 relative flex items-center justify-between p-4 border rounded-lg ${cardClass} ${className}`}>
      <div className="flex items-center gap-4">
        <div className="bg-white shadow-sm border border-gray-200 h-10 w-14 flex items-center justify-center rounded-md">
          {getCardIcon()}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {paymentMethod.brand || paymentMethod.type} •••• {paymentMethod.last4}
            </p>
            {paymentMethod.isDefault && (
              <span className="ml-2 text-xs text-white bg-primary px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {formattedExpiry && (
              <p className={`text-sm ${isExpiringSoon() ? 'text-amber-600 font-medium' : 'text-muted-foreground'}`}>
                Expires {formattedExpiry}
                {isExpiringSoon() && (
                  <span className="ml-2 inline-flex items-center">
                    <AlertCircle className="h-3 w-3 text-amber-600 inline mr-1" />
                    Expiring soon
                  </span>
                )}
              </p>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">{paymentMethod.name}</p>
        </div>
      </div>
      
      {/* Card actions */}
      <div className="flex items-center gap-1">
        {!paymentMethod.isDefault && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSetDefault(paymentMethod.id)}
            aria-label="Set as default"
            className="text-muted-foreground hover:text-primary"
          >
            <Star className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Set default</span>
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(paymentMethod.id)}
          aria-label="Edit payment method"
          className="text-muted-foreground hover:text-blue-600"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Edit</span>
        </Button>
        
        {!paymentMethod.isDefault && (
          <>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-1">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    onRemove(paymentMethod.id);
                    setShowDeleteConfirm(false);
                  }}
                  aria-label="Confirm remove payment method"
                  className="text-white"
                >
                  <span>Confirm</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  aria-label="Cancel remove payment method"
                >
                  <span>Cancel</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Remove payment method"
                className="text-muted-foreground hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Remove</span>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
