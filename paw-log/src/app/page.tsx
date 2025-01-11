"use client";

import { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [entries, setEntries] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const petName = (form.elements.namedItem('petName') as HTMLInputElement).value;
    const food = (form.elements.namedItem('food') as HTMLInputElement).value || 'N/A';
    const water = (form.elements.namedItem('water') as HTMLInputElement).value || 'N/A';
    const pee = (form.elements.namedItem('pee') as HTMLInputElement).value || 'N/A';
    const poo = (form.elements.namedItem('poo') as HTMLInputElement).value || 'N/A';
    const medication = (form.elements.namedItem('medication') as HTMLInputElement).value || 'N/A';

    const entryHTML = `
      <div class="p-1 bb-1">
        <strong>Pet Name:</strong> ${petName}<br>
        <strong>Food Intake:</strong> ${food} g<br>
        <strong>Water Intake:</strong> ${water} ml<br>
        <strong>Pee Times:</strong> ${pee}<br>
        <strong>Poop Times:</strong> ${poo}<br>
        <strong>Medication:</strong> ${medication}<br>
        <hr>
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

      <header className="bg-pastelPurple text-white text-center py-4 flex justify-center items-center">
        <h1>Pet Care Tracker</h1>
      </header>

      <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
        <h2>Track Your Pet's Daily Care</h2>
        <form id="pet-tracker-form" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="pet-name">Pet Name</label>
            <input type="text" id="pet-name" name="petName" required />
          </div>

          <div className="mb-1">
            <label htmlFor="food">Food Intake (g)</label>
            <input type="number" id="food" name="food" placeholder="Enter amount in grams" />
          </div>

          <div className="mb-1">
            <label htmlFor="water">Water Intake (ml)</label>
            <input type="number" id="water" name="water" placeholder="Enter amount in milliliters" />
          </div>

          <div className="mb-1">
            <label htmlFor="pee">Pee Times</label>
            <input type="number" id="pee" name="pee" placeholder="Enter number of pee times" />
          </div>

          <div className="mb-1">
            <label htmlFor="poo">Poop Times</label>
            <input type="number" id="poo" name="poo" placeholder="Enter number of poop times" />
          </div>

          <div className="mb-1">
            <label htmlFor="medication">Medication</label>
            <textarea id="medication" name="medication" rows={3} placeholder="Enter medication details (if any)" />
          </div>

          <button type="submit" className="bg-pastelPurple text-white border-none py-3 px-6 rounded cursor-pointer hover:bg-green-600">
            <p>Add Entry</p>
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-center text-green-600 text-xl mb-4">Daily Entries</h2>
          <div id="entries" dangerouslySetInnerHTML={{ __html: entries.join('') }} />
        </div>
      </div>

      <footer className="text-center mt-8 text-gray-600">
        <p>&copy; 2025 Pet Care Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;