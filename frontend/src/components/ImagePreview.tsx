import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, alt }) => {
  return (
    <div className="mt-4 flex justify-center">
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-full h-auto rounded-xl border shadow-lg bg-white"
      />
    </div>
  );
};

export default ImagePreview;
