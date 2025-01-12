"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import ImageUpload from "../../components/ImageUpload";
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0/client';

interface Pet {
  name: string;
  image: string;
  hunger: number;
  thirst: number;
  lastUpdated: Date;
}

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<string | null>(null);
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPetImage = localStorage.getItem("petImage");
      if (savedPetImage) {
        setPetImage(savedPetImage);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <img
            src="logo.png" // Your loading image
            alt="Loading"
            className="w-32 h-32 object-contain animate-pulse mx-auto"
          />
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!petName || !petImage) {
      alert("Please enter a pet name and upload an image.");
      return;
    }
    const newPet: Pet = {
      name: petName,
      image: petImage,
      hunger: Math.floor(Math.random() * 101),
      thirst: Math.floor(Math.random() * 101),
      lastUpdated: new Date(),
    };
    setPets([...pets, newPet]);
    setPetName("");
    setPetImage(null);
  };

  return (
    <div>
      <Head>
        <title>Pet Care Tracker</title>
      </Head>

      {/* Header and content go here */}
      <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Your Pet</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Pet Name</label>
            <input
              type="text"
              className="border border-gray-200 rounded-md p-2 w-full"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </div>

          {petImage ? (
            <div className="text-center mb-4">
              <img
                src={petImage}
                alt="Pet"
                className="w-32 h-32 object-cover rounded-full mx-auto border"
              />
            </div>
          ) : (
            <ImageUpload onImageUpload={setPetImage} />
          )}

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-700"
          >
            Add Pet
          </button>
        </form>

        {/* Pet list and progress bars */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Your Pets</h2>
          <div className="grid grid-cols-2 gap-4">
            {pets.map((pet, index) => (
              <div
                key={index}
                className="cursor-pointer text-center bg-white rounded-lg p-4 shadow-md"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto border"
                />
                <p className="mt-2 text-lg font-semibold">{pet.name}</p>
                <p className="text-xs mt-1 text-gray-500">
                  Last updated: {pet.lastUpdated.toLocaleString()}
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Hunger</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-400 h-4 rounded-full"
                      style={{ width: `${pet.hunger}%` }}
                    ></div>
                  </div>
                  <p className="text-sm">{pet.hunger}%</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Thirst</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-400 h-4 rounded-full"
                      style={{ width: `${pet.thirst}%` }}
                    ></div>
                  </div>
                  <p className="text-sm">{pet.thirst}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
