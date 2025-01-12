"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import ImageUpload from "../../components/ImageUpload";
import { useRouter } from "next/navigation"; // For programmatic navigation

interface Pet {
  name: string;
  image: string; // Base64 string for image
}

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<string | null>(null);

  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    const savedPetImage = localStorage.getItem("petImage");
    if (savedPetImage) {
      setPetImage(savedPetImage);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!petName || !petImage) {
      alert("Please enter a pet name and upload an image.");
      return;
    }
    const newPet: Pet = { name: petName, image: petImage };
    setPets([...pets, newPet]);
    setPetName("");
    setPetImage(null);
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
                src={petImage || "/default-profile.png"}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2"
              />
            </div>
            <span className="text-lg font-semibold">user.name || Account</span>
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

        <h1 className="text-4xl font-bold">🐾 Pet Care Tracker</h1>
      </header>

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

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Your Pets</h2>
          <div className="grid grid-cols-2 gap-4">
            {pets.map((pet, index) => (
              <div
                key={index}
                className="cursor-pointer text-center"
                onClick={() => router.push("/pages/selectedPets")}
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto border"
                />
                <p className="mt-2 text-lg font-semibold">{pet.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 mb-6 text-center">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
