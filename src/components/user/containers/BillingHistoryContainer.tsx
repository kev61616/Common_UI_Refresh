"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PaymentMethodCard, { PaymentMethod } from '@/components/user/ui/PaymentMethodCard';
import TransactionItem, { Transaction } from '@/components/user/ui/TransactionItem';

// Mock data for payment methods
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_123456",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2026,
    name: "Jane Smith",
    isDefault: true,
  },
  {
    id: "pm_789012",
    type: "card",
    brand: "Mastercard",
    last4: "5678",
    expMonth: 9,
    expYear: 2025,
    name: "Jane Smith",
    isDefault: false,
  },
];

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "tx_123456",
    date: "2025-04-01T00:00:00Z",
    amount: "$19.99",
    description: "Premium Plan - Monthly Subscription",
    status: "completed",
    invoice: "INV-123456",
  },
  {
    id: "tx_123457",
    date: "2025-03-01T00:00:00Z",
    amount: "$19.99",
    description: "Premium Plan - Monthly Subscription",
    status: "completed",
    invoice: "INV-123457",
  },
  {
    id: "tx_123458",
    date: "2025-02-01T00:00:00Z",
    amount: "$9.99",
    description: "Standard Plan - Monthly Subscription",
    status: "completed",
    invoice: "INV-123458",
  },
  {
    id: "tx_123459",
    date: "2025-01-15T00:00:00Z",
    amount: "$0.00",
    description: "Free Plan - Signup",
    status: "completed",
    invoice: "INV-123459",
  },
];

interface BillingHistoryContainerProps {
  userId: string;
}

const BillingHistoryContainer: React.FC<BillingHistoryContainerProps> = ({ userId }) => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  
  // Handle setting a payment method as default
  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };
  
  // Handle editing a payment method
  const handleEditPaymentMethod = (id: string) => {
    // In a real app, this would open a modal to edit
    console.log(`Edit payment method ${id}`);
  };
  
  // Handle removing a payment method
  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
  };
  
  // Handle downloading an invoice
  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real app, this would trigger a download or open in a new tab
    console.log(`Download invoice ${invoiceId}`);
  };
  
  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowAddPaymentMethod(true)}
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
        
        <div className="space-y-3">
          {paymentMethods.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              <p>No payment methods found. Add one to manage your subscription.</p>
            </Card>
          ) : (
            paymentMethods.map(method => (
              <PaymentMethodCard 
                key={method.id} 
                paymentMethod={method}
                onSetDefault={handleSetDefault}
                onEdit={handleEditPaymentMethod}
                onRemove={handleRemovePaymentMethod}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        
        {transactions.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            <p>No transactions found. Subscribe to a paid plan to see your billing history.</p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" data-test="transactions-table">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <TransactionItem 
                      key={transaction.id}
                      transaction={transaction}
                      onDownloadInvoice={handleDownloadInvoice}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BillingHistoryContainer;
