const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// POST /pets - Create a new pet
router.post('/', async (req, res) => {
    const newPet = new Pet(req.body);
    try {
      const savedPet = await newPet.save();
      res.status(201).json(savedPet); // Respond with the created pet
    } catch (error) {
      res.status(400).json({ message: 'Error creating pet', error });
    }
  });

// GET /pets - Fetch all pets
router.get('/', async (req, res) => {
    try {
      const pets = await Pet.find(); // Fetch all pets from the database
      res.json(pets); // Send the pets as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pets', error });
    }
  });

module.exports = router;
