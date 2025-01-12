"use client";

import { useState } from "react";
import Head from "next/head";
import { SocialIcon } from "react-social-icons";
import ImageUpload from "../../components/ImageUpload";
import PetInfo from "../../components/PetInfo";
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImage(reader.result as string); // Save base64 image
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleProfileClick = (petName: string) => {
    router.push("/pages/selectedPets"); // Navigate to /pages/selectedPets
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

          <div className="mb-4">
            <label className="block font-semibold">Upload Pet Picture</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {petImage && <img src={petImage} alt="Pet preview" className="mt-2 w-32 h-32 object-cover rounded-full border" />}
          </div>

          <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-700">
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
                onClick={() => handleProfileClick(pet.name)}
              >
                <img src={pet.image} alt={pet.name} className="w-32 h-32 object-cover rounded-full mx-auto border" />
                <p className="mt-2 text-lg font-semibold">{pet.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="flex justify-center items-center mt-8 mb-6">
        <SocialIcon url='https://github.com/Rongbin99/PawLog' style={{height: "30px", width: "30px", marginRight: "10px"}} />
        <p>&copy; 2025 Pet Care Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
