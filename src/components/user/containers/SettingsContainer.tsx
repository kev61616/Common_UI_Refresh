"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import ToggleSettings from '@/components/user/ui/ToggleSettings';

// Mock data for user settings
const mockSettings = {
  notifications: {
    email: true,
    app: true,
    marketing: false,
    updates: true,
    learningReminders: true,
    achievementAlerts: true,
    weeklyProgressReport: true,
    feedbackRequests: false,
  },
  preferences: {
    theme: 'system' as 'light' | 'dark' | 'system',
    language: 'en',
    timezone: 'America/Los_Angeles',
    startPage: 'dashboard' as 'dashboard' | 'courses' | 'profile',
    contentDensity: 'comfortable' as 'compact' | 'comfortable' | 'spacious',
  },
  security: {
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 60, // in minutes
  },
  privacy: {
    shareProgressWithTeachers: true,
    showProfileToClassmates: true,
    allowDataAnalytics: true,
    showOnlineStatus: true,
    showLearningActivity: true,
  },
  accessibility: {
    highContrast: false,
    largerText: false,
    reducedMotion: false,
    screenReaderOptimized: false,
  },
};

interface SettingsContainerProps {
  userId: string;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({ userId }) => {
  const [settings, setSettings] = useState(mockSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Handle toggle change
  const handleToggleChange = (section: keyof typeof settings, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value,
      },
    }));
    
    // Clear the saved message if it was shown
    if (isSaved) {
      setIsSaved(false);
    }
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Auto-clear the saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="space-y-8">
      {/* Settings updated notification */}
      {isSaved && (
        <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-md flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Settings updated successfully</span>
        </div>
      )}

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <ToggleSettings
            id="email-notifications"
            label="Email Notifications"
            description="Receive notifications via email"
            checked={settings.notifications.email}
            onChange={(value) => handleToggleChange('notifications', 'email', value)}
          />
          
          <ToggleSettings
            id="app-notifications"
            label="In-App Notifications"
            description="Receive notifications within the app"
            checked={settings.notifications.app}
            onChange={(value) => handleToggleChange('notifications', 'app', value)}
          />
          
          <ToggleSettings
            id="marketing-notifications"
            label="Marketing Communications"
            description="Receive promotional emails and offers"
            checked={settings.notifications.marketing}
            onChange={(value) => handleToggleChange('notifications', 'marketing', value)}
          />
          
          <ToggleSettings
            id="update-notifications"
            label="Product Updates"
            description="Get notified about new features and improvements"
            checked={settings.notifications.updates}
            onChange={(value) => handleToggleChange('notifications', 'updates', value)}
          />
          
          <ToggleSettings
            id="learning-reminders"
            label="Learning Reminders"
            description="Receive reminders to continue your learning journey"
            checked={settings.notifications.learningReminders}
            onChange={(value) => handleToggleChange('notifications', 'learningReminders', value)}
          />
        </div>
      </Card>
      
      {/* Security Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <div className="space-y-4">
          <ToggleSettings
            id="two-factor-auth"
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            checked={settings.security.twoFactorAuth}
            onChange={(value) => handleToggleChange('security', 'twoFactorAuth', value)}
          />
          
          <ToggleSettings
            id="login-notifications"
            label="Login Notifications"
            description="Get notified when someone logs into your account"
            checked={settings.security.loginNotifications}
            onChange={(value) => handleToggleChange('security', 'loginNotifications', value)}
          />
        </div>
      </Card>
      
      {/* Privacy Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <ToggleSettings
            id="share-progress"
            label="Share Progress with Teachers"
            description="Allow teachers to view your learning progress"
            checked={settings.privacy.shareProgressWithTeachers}
            onChange={(value) => handleToggleChange('privacy', 'shareProgressWithTeachers', value)}
          />
          
          <ToggleSettings
            id="show-profile"
            label="Show Profile to Classmates"
            description="Make your profile visible to other students"
            checked={settings.privacy.showProfileToClassmates}
            onChange={(value) => handleToggleChange('privacy', 'showProfileToClassmates', value)}
          />
          
          <ToggleSettings
            id="data-analytics"
            label="Allow Data Analytics"
            description="Help us improve by sharing usage data"
            checked={settings.privacy.allowDataAnalytics}
            onChange={(value) => handleToggleChange('privacy', 'allowDataAnalytics', value)}
          />
          
          <ToggleSettings
            id="online-status"
            label="Show Online Status"
            description="Let others see when you're online"
            checked={settings.privacy.showOnlineStatus}
            onChange={(value) => handleToggleChange('privacy', 'showOnlineStatus', value)}
          />
        </div>
      </Card>
      
      {/* Accessibility Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Accessibility Settings</h3>
        <div className="space-y-4">
          <ToggleSettings
            id="high-contrast"
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            checked={settings.accessibility.highContrast}
            onChange={(value) => handleToggleChange('accessibility', 'highContrast', value)}
          />
          
          <ToggleSettings
            id="larger-text"
            label="Larger Text"
            description="Increase text size throughout the application"
            checked={settings.accessibility.largerText}
            onChange={(value) => handleToggleChange('accessibility', 'largerText', value)}
          />
          
          <ToggleSettings
            id="reduced-motion"
            label="Reduced Motion"
            description="Minimize animations and transitions"
            checked={settings.accessibility.reducedMotion}
            onChange={(value) => handleToggleChange('accessibility', 'reducedMotion', value)}
          />
        </div>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          className="gap-2"
          onClick={handleSaveSettings}
          disabled={isLoading}
        >
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsContainer;
