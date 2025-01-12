"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../../../../components/Footer";
import ImageUpload from "../../../../components/ImageUpload";
import PetInfo from "../../../../components/PetInfo";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const SelectedPet = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [petImage, setPetImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const savedPetImage = localStorage.getItem("petImage");
    if (savedPetImage) {
      setPetImage(savedPetImage);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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

      <header className="bg-pastelPurple text-white flex justify-between items-center py-4 px-6">
        <div className="relative group">
          {/* Profile Button */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="rounded-full p-1 hover:bg-transparent">
              <img
                src={user?.picture || "/default.jpg"}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2"
              />
            </div>
            <span className="text-lg font-semibold">{user?.name || "Account"}</span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-4 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-10">
            <div className="">
              <a href="/api/auth/me" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg">User Profile</a>
              <a href="/api/auth/login" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Login</a>
              <a href="/api/auth/logout" className="block px-6 py-3 text-gray-700 hover:bg-red-100 rounded-b-lg">Logout</a>
            </div>
          </div>
        </div>

        <Link href="/">
        <h1 className="text-4xl font-bold cursor-pointer">🐾 Pet Care Tracker</h1>
      </Link>
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
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-800"
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

      <div className="flex justify-center items-center mt-8 mb-6 text-center">
        <Footer />
      </div>
    </div>
  );
};

export default SelectedPet;
