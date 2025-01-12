import React, { useState } from 'react';

interface PetFormProps {
  onSubmit: (entryHTML: string) => void;
}

const PetInfo: React.FC<PetFormProps> = ({ petName, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const food = (form.elements.namedItem("food") as HTMLInputElement).value || "N/A";
    const water = (form.elements.namedItem("water") as HTMLInputElement).value || "N/A";
    const pee = (form.elements.namedItem("pee") as HTMLInputElement).value || "N/A";
    const poo = (form.elements.namedItem("poo") as HTMLInputElement).value || "N/A";
    const medication = (form.elements.namedItem("medication") as HTMLInputElement).value || "N/A";

    const entry = {
      food,
      water,
      pee,
      poo,
      medication,
      date: new Date().toLocaleString(),
    };

     // Retrieve existing entries from localStorage
    const existingEntries = JSON.parse(localStorage.getItem("petEntries") || "[]");

    // Add the new entry to the list
    const updatedEntries = [...existingEntries, entry];
    
    // Store the updated list in localStorage
    localStorage.setItem("petEntries", JSON.stringify(updatedEntries));

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

    onSubmit(entryHTML);
    form.reset();
  };

  return (
    <form id="pet-tracker-form" className="space-y-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="food" className="block font-semibold">🍲 Food Intake (g)</label>
        <input type="number" id="food" name="food" placeholder="" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="water" className="block font-semibold">💧 Water Intake (ml)</label>
        <input type="number" id="water" name="water" placeholder="" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="pee" className="block font-semibold">🚽 Pee Times</label>
        <input type="number" id="pee" name="pee" placeholder="" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="poo" className="block font-semibold">💩 Poop Times</label>
        <input type="number" id="poo" name="poo" placeholder="" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="medication" className="block font-semibold">💊 Medication</label>
        <textarea id="medication" name="medication" rows={3} placeholder="" className="ml-auto border border-gray-200 rounded-md p-2 w-full" />
      </div>

      <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-800">
        <p>Add Entry</p>
      </button>
    </form>
  );
};

export default PetInfo;
