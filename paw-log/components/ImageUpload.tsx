import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (base64String: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const placeholderImage = "/default.jpg"; // Path to your placeholder image
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles file selection and updates the displayed image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("petImage", base64String); // Optional: Store the image locally
        setImageSrc(base64String); // Update the displayed image
        onImageUpload(base64String); // Pass the image data to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulates a click on the hidden file input
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="text-gray-600 font-semibold mb-2">
        Upload Your Pet's Picture:
      </label>
      {/* Clickable image */}
      <img
        src={imageSrc || placeholderImage}
        alt="Pet"
        className="w-32 h-32 object-cover rounded-full cursor-pointer border"
        onClick={handleImageClick}
        tabIndex={0} // Makes the image focusable for keyboard users
        title="Click to upload or replace the image"
        aria-label="Click to upload or replace the image"
      />
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }} // Ensures the file input is hidden
      />
    </div>
  );
};

export default ImageUpload;
