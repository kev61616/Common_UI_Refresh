"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, Building, MapPin } from 'lucide-react';

interface ContactInfoCardProps {
  email: string;
  phone: string;
  organization: string;
  location: string;
  isEditing?: boolean;
  register?: any;
  errors?: any;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  email,
  phone,
  organization,
  location,
  isEditing = false,
  register,
  errors
}) => {
  if (isEditing && register) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Organization
            </label>
            <input
              id="company"
              {...register('company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors?.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              id="location"
              {...register('location')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors?.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p data-test="user-email">{email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p data-test="user-phone">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Organization</p>
            <p>{organization}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactInfoCard;
