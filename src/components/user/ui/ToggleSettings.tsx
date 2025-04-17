"use client";

import React from 'react';

interface ToggleSettingsProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  id: string;
  disabled?: boolean;
}

const ToggleSettings: React.FC<ToggleSettingsProps> = ({
  checked,
  onChange,
  label,
  description,
  id,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        {description && (
          <p id={`${id}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          id={id}
          aria-describedby={description ? `${id}-description` : undefined}
          disabled={disabled}
        />
        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
      </label>
    </div>
  );
};

export default ToggleSettings;
