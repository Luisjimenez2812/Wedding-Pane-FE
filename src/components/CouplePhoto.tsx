import React from 'react';
import coupleImage from '../assets/Image01.jpg';

interface CouplePhotoProps {
  imageSrc?: string;
  altText?: string;
}

export const CouplePhoto: React.FC<CouplePhotoProps> = ({
  imageSrc,
  altText = 'Luis & Rosa',
}) => {
  // Usar la imagen importada por defecto
  const finalImageSrc = imageSrc || coupleImage;

  return (
    <div className='couple-photo'>
      <img src={finalImageSrc} alt={altText} className='couple-photo-image' />
    </div>
  );
};
