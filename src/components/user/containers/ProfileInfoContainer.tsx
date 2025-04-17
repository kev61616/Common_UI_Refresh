"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Save, X } from 'lucide-react';
import ProfileImage from '@/components/user/ui/ProfileImage';
import ContactInfoCard from '@/components/user/ui/ContactInfoCard';
import StatsDisplay from '@/components/user/ui/StatsDisplay';

// Mock data
const mockUserProfile = {
  id: "current-user",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "+1 (555) 123-4567",
  company: "BrainBox Learning",
  location: "San Francisco, CA",
  role: "Student",
  joinDate: "2025-01-15T00:00:00Z",
  avatarUrl: "/profile/jane-avatar.svg",
  biography: "",
  emailVerified: true,
  lastLoginDate: "2025-04-15T00:00:00Z",
};

const mockStats = [
  { value: 42, label: "Courses Completed" },
  { value: 78, label: "Practice Tests", change: { value: 12, isPositive: true } },
  { value: 24, label: "Hours Studied", change: { value: 5, isPositive: true } },
  { value: 89, label: "Average Score", change: { value: 3, isPositive: true } },
];

interface ProfileInfoContainerProps {
  userId: string;
}

const ProfileInfoContainer: React.FC<ProfileInfoContainerProps> = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  const [isLoading, setIsLoading] = useState(false);

  // Handle edit profile button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save profile changes
  const handleSaveClick = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  // Handle cancel edit
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header with Avatar */}
      <Card className="p-6 relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <ProfileImage 
            src={profile.avatarUrl}
            alt={profile.name}
            size="large"
            editable={isEditing}
            onUploadClick={() => {}} // Add upload functionality in real app
          />
          
          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.role}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 gap-2"
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
            
            {isEditing && (
              <div className="mt-3 flex gap-2">
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={handleSaveClick}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleCancelClick}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {/* Contact Information */}
      <ContactInfoCard 
        email={profile.email}
        phone={profile.phone}
        organization={profile.company}
        location={profile.location}
        isEditing={isEditing}
      />
      
      {/* Learning Statistics */}
      <StatsDisplay 
        title="Learning Statistics"
        stats={mockStats}
        columns={4}
      />
    </div>
  );
};

export default ProfileInfoContainer;
