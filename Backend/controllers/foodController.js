const Food = require('../models/foodModel');
const fs = require('fs');


// function to add food item
async function handleAddFoodItem(req, res) {
    let image_filename = `${req.file.filename}`;

    const food = new Food({
        ...req.body,
        image: image_filename
    });

    try {
        await food.save();
        res.status(201).json({
            success: true,
            message: 'Food item added successfully',
            data: food
        });
    } catch (err) {
        console.log('Error added handleAddFoodItem:', err);
        res.status(500).json({ error: err.message })
    }
};


// function to list all food items
async function handleListFoodItems(req, res) {
    try {
        const foods = await Food.find({});
        return res.status(200).json({ success: true, data: foods })
    } catch (err) {
        console.log('Error at handleListFoodItems:', err);
        return res.status(500).json({ success: false, error: err.message })
    }
}


// function to remove food item
async function handleRemoveFoodItem(req, res) {
    try {
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await Food.findByIdAndDelete(req.body.id);
        return res.status(200).json({ success: true, message: 'Food item deleted successfully' })
    } catch (err) {
        console.log('Error at handleRemoveFoodItem:', err);
        return res.status(500).json({ success: false, error: err.message })
    }
}


module.exports = {
    handleAddFoodItem,
    handleListFoodItems,
    handleRemoveFoodItem
};
