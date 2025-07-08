import foodModel from "../models/foodModel.js";
import fs from "fs";    

// Add food item
const addFood = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        let image_filename = req.file.filename;

        // Validate required fields
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, description, price, and category are required"
            });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        });

        await food.save();
        res.json({
            success: true,
            message: "Food item added successfully",
            data: food
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding food item",
            error: error.message
        });
    }
}

// Get all food items
const getAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            message: "Food items retrieved successfully",
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving food items",
            error: error.message
        });
    }
}

export {addFood, getAllFood};