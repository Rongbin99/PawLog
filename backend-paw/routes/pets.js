const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// Add a new pet
router.post("/", async (req, res) => {
    const { userId, name, image, hunger, thirst } = req.body;

    if (!userId || !name || !image) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof hunger !== 'number' || typeof thirst !== 'number') {
        return res.status(400).json({ message: "Hunger and thirst must be numbers" });
    }

    try {
        const pet = new Pet({ userId, name, image, hunger, thirst });
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        console.error("Error saving pet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get pets for a user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        console.log(`Fetching pets for userId: ${userId}`);
        const pets = await Pet.find({ userId });
        res.status(200).json(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
