"use client";

import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  editable?: boolean;
  onUploadClick?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  size = 'medium',
  editable = false,
  onUploadClick
}) => {
  // Map size to pixel values
  const sizeMap = {
    small: {
      container: 'w-20 h-20',
      uploadButton: 'w-6 h-6'
    },
    medium: {
      container: 'w-24 h-24',
      uploadButton: 'w-8 h-8'
    },
    large: {
      container: 'w-32 h-32',
      uploadButton: 'w-10 h-10'
    }
  };

  const { container, uploadButton } = sizeMap[size];

  return (
    <div className={`relative ${container} rounded-full overflow-hidden border-4 border-primary/10`}>
      {src ? (
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover"
          sizes={`(max-width: 768px) ${parseInt(container) * 0.8}px, ${parseInt(container)}px`}
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-2xl font-bold">
            {alt.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {editable && onUploadClick && (
        <button 
          onClick={onUploadClick}
          className={`absolute bottom-0 right-0 ${uploadButton} bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md`}
          aria-label="Upload profile picture"
          type="button"
        >
          <Camera size={size === 'small' ? 12 : size === 'medium' ? 16 : 20} />
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
