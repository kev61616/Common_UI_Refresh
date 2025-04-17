"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, ReceiptText } from 'lucide-react';

export interface Transaction {
  id: string;
  date: string;
  amount: string;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  invoice: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onDownloadInvoice: (invoiceId: string) => void;
  className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onDownloadInvoice,
  className = ''
}) => {
  // Format date
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format time
  const formattedTime = new Date(transaction.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Status styles based on transaction status
  const getStatusStyles = () => {
    switch (transaction.status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };
  
  // Format the invoice ID to be more readable
  const formatInvoiceId = (invoiceId: string) => {
    return invoiceId.replace(/^INV-/, '');
  };

  // Format amount for better display
  const getAmountClass = () => {
    if (transaction.amount.startsWith('-')) {
      return 'text-red-600 font-medium';
    } else if (transaction.amount === '$0.00') {
      return 'text-gray-500';
    } else {
      return 'text-green-600 font-medium';
    }
  };

  return (
    <tr className={`group hover:bg-muted/20 transition-colors duration-200 ${className}`}>
      <td className="py-3 px-4 border-b border-border">
        <div className="flex flex-col">
          <div className="font-medium">{formattedDate}</div>
          <div className="text-xs text-muted-foreground">{formattedTime}</div>
        </div>
      </td>
      
      <td className="py-3 px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1 rounded-full hidden sm:flex">
            <ReceiptText className="h-4 w-4 text-primary" />
          </div>
          <span>{transaction.description}</span>
        </div>
      </td>
      
      <td className={`py-3 px-4 border-b border-border ${getAmountClass()}`}>
        {transaction.amount}
      </td>
      
      <td className="py-3 px-4 border-b border-border">
        <span className={`px-2 py-1 ${getStatusStyles()} rounded-full text-xs font-medium`}>
          {transaction.status}
        </span>
      </td>
      
      <td className="py-3 px-4 border-b border-border">
        <div className="flex items-center justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group-hover:bg-primary/10"
            onClick={() => onDownloadInvoice(transaction.invoice)}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline-block">{formatInvoiceId(transaction.invoice)}</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
