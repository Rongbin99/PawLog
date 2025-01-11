"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

const Home = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [petImage, setPetImage] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);

  useEffect(() => {
    const savedPetImage = localStorage.getItem("petImage");
    if (savedPetImage) {
      setPetImage(savedPetImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("petImage", base64String);
        setPetImage(base64String);
        setIsEditingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPicture = () => {
    setIsEditingImage(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const petName = (form.elements.namedItem("petName") as HTMLInputElement).value;
    const food = (form.elements.namedItem("food") as HTMLInputElement).value || "N/A";
    const water = (form.elements.namedItem("water") as HTMLInputElement).value || "N/A";
    const pee = (form.elements.namedItem("pee") as HTMLInputElement).value || "N/A";
    const poo = (form.elements.namedItem("poo") as HTMLInputElement).value || "N/A";
    const medication = (form.elements.namedItem("medication") as HTMLInputElement).value || "N/A";

    const entryHTML = `
      <div class="p-4 bg-gray-100 border rounded-lg mb-4">
        <strong>🐾 Pet Name:</strong> ${petName}<br>
        <strong>🍲 Food Intake:</strong> ${food} g<br>
        <strong>💧 Water Intake:</strong> ${water} ml<br>
        <strong>🚽 Pee Times:</strong> ${pee}<br>
        <strong>💩 Poop Times:</strong> ${poo}<br>
        <strong>💊 Medication:</strong> ${medication}<br>
      </div>
    `;

    setEntries([...entries, entryHTML]);
    form.reset();
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
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Upload Your Pet's Picture:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}
        </div>

        <form id="pet-tracker-form" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pet-name" className="block font-semibold">Pet Name</label>
            <input type="text" id="pet-name" name="petName" className="border border-gray-200 rounded-md p-2 w-full" required />
          </div>

          <div className="mb-4 flex items-center">
            <span className="mr-2">🍲</span>
            <label htmlFor="food" className="block font-semibold">Food Intake (g)</label>
            <input type="number" id="food" name="food" placeholder="Enter amount in grams" className="ml-auto border border-gray-200 rounded-md p-2" />
          </div>

          <div className="mb-4 flex items-center">
            <span className="mr-2">💧</span>
            <label htmlFor="water" className="block font-semibold">Water Intake (ml)</label>
            <input type="number" id="water" name="water" placeholder="Enter amount in milliliters" className="ml-auto border border-gray-200 rounded-md p-2" />
          </div>

          <div className="mb-4 flex items-center">
            <span className="mr-2">🚽</span>
            <label htmlFor="pee" className="block font-semibold">Pee Times</label>
            <input type="number" id="pee" name="pee" placeholder="Enter number of pee times" className="ml-auto border border-gray-200 rounded-md p-2" />
          </div>

          <div className="mb-4 flex items-center">
            <span className="mr-2">💩</span>
            <label htmlFor="poo" className="block font-semibold">Poop Times</label>
            <input type="number" id="poo" name="poo" placeholder="Enter number of poop times" className="ml-auto border border-gray-200 rounded-md p-2" />
          </div>

          <div className="mb-4 flex items-center">
            <span className="mr-2">💊</span>
            <label htmlFor="medication" className="block font-semibold">Medication</label>
            <textarea id="medication" name="medication" rows={3} placeholder="Enter medication details (if any)" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
          </div>

          <button type="submit" className="bg-pastelPurple text-white py-3 px-6 rounded hover:bg-purple-700">
            Add Entry
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-center text-purple-600 text-xl mb-4">Daily Entries</h2>
          <div id="entries" dangerouslySetInnerHTML={{ __html: entries.join("") }} />
        </div>
      </div>

      <footer className="text-center mt-8 text-gray-600">
        <p>&copy; 2025 Pet Care Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
