"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../../../../components/Footer";
import ImageUpload from "../../../../components/ImageUpload";
import PetInfo from "../../../../components/PetInfo";

const SelectedPet = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [petImage, setPetImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);

  useEffect(() => {
    const savedPetImage = localStorage.getItem("petImage");
    if (savedPetImage) {
      setPetImage(savedPetImage);
    }
  }, []);

  const handleFormSubmit = (entryHTML: string) => {
    setEntries([...entries, entryHTML]);
  };

  const handleEditPicture = () => {
    setIsEditingImage(true);
  };

  return (
    <div>
      <Head>
        <title>Pet Care Tracker</title>
      </Head>

      <header className="bg-pastelPurple text-white text-center py-8">
        <h1 className="text-4xl font-bold">🐾 Pet Care Tracker</h1>
      </header>

      <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Track Your Pet's Daily Care</h2>

        <div className="text-center mb-4">
          {petImage && !isEditingImage ? (
            <>
              <img
                src={petImage}
                alt="Pet"
                className="w-32 h-32 object-cover rounded-full mx-auto border mb-4"
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleEditPicture}
              >
                Change Picture
              </button>
            </>
          ) : (
            <ImageUpload onImageUpload={setPetImage} />
          )}
        </div>

        <PetInfo onSubmit={handleFormSubmit} />

        <div className="mt-8">
          <h2 className="text-center text-purple-600 text-xl mb-4">Daily Entries</h2>
          <div id="entries" dangerouslySetInnerHTML={{ __html: entries.join("") }} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SelectedPet;
