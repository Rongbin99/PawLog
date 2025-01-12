"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import ImageUpload from "../../components/ImageUpload";
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0/client';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the warning icon

interface Pet {
  name: string;
  image: string;
  hunger: number;
  thirst: number;
  lastUpdated: string;
}

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petName, setPetName] = useState("");
  const [petImage, setPetImage] = useState<string | null>(null);
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const fetchPets = () => {
      const storedPets = JSON.parse(localStorage.getItem("pets") || "[]");
      setPets(storedPets);
  };
  fetchPets();
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
      lastUpdated: new Date().toLocaleString(),
    };

    // Retrieve existing pets from localStorage
    const existingPets = JSON.parse(localStorage.getItem("pets") || "[]");

    // Add the new pet to the list
    const updatedPets = [...existingPets, newPet];

    // Store the updated list in localStorage
    localStorage.setItem("pets", JSON.stringify(updatedPets));

    // Update the state
    setPets(updatedPets);
    setPetName("");
    setPetImage(null);
  };
  
  const getGridClass = (length: number) => {
    if (length === 1) return "grid-cols-1 place-items-center"; // 1 pet: centered
    const rows = Math.ceil(length / 2); // Calculate rows dynamically
    return `grid-cols-2 gap-4 grid-rows-${rows}`;
  };

  const getItemClass = (length: number, index: number) => {
    if (length % 2 !== 0 && index === length - 1) {
      // Center the last item if odd number of pets
      return "col-span-2 place-self-center";
    }
    return "";
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    window.location.href = "/api/auth/logout"; // Redirect to the logout endpoint
  };

  return (
    <div>
      <Head>
        <title>Pet Care Tracker</title>
      </Head>

      {/* Header and content go here */}
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
            <span className="text-lg font-semibold">{user ? user.name : "Account"}</span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-4 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-10">
            <div>
              {user ? (
                <>
                  <a
                    href="/api/auth/me"
                    className="block px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    User Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/api/auth/login"
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </a>
              )}
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

        {/* Pet list and progress bars */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Your Pets</h2>
          <div className={`grid ${getGridClass(pets.length)}`}>
            {pets.map((pet, index) => (
              <div
                key={index}
                className={`cursor-pointer text-center ${getItemClass(pets.length, index)}`}
                onClick={() => router.push(`/pages/selectedPets?petName=${encodeURIComponent(pet.name)}`)}
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
                  <p className="text-sm text-gray-500">
                  Hunger: {pet.hunger}%
                  {pet.hunger < 25 && <FaExclamationTriangle className="inline text-red-500 ml-1" />}
                </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Thirst</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-400 h-4 rounded-full"
                      style={{ width: `${pet.thirst}%` }}
                    ></div>
                  </div>
                  <p className="text-sm">
                    Thirst: {pet.thirst}%
                    {pet.thirst < 25 && <FaExclamationTriangle className="inline text-red-500 ml-1" />}
                  </p>
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
