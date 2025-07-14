const Food = require('../models/Food.add');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

// Add Food (Admin only)
exports.addFood = async (req, res) => {
    const { FoodName, FoodPrice, Description, Category } = req.body;

    if (!FoodName || !FoodPrice || !Category || !req.file) {
        return res.status(400).json({ message: "All fields and photo are required" });
    }

    try {
        const photoPath = `/uploads/${req.file.filename}`;
        const food = new Food({ FoodName, FoodPrice, Description, Category, Photos: photoPath });
        await food.save();

        // Excel file handling
        const filePath = path.join(__dirname, '..', process.env.EXCEL_FILE_PATH || 'ffoods.xlsx');
        const foodEntry = { FoodName, FoodPrice, Description, Category, Photos: photoPath };

        let workbook, worksheet, data = [];

        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
            data = xlsx.utils.sheet_to_json(worksheet);
        } else {
            workbook = xlsx.utils.book_new();
        }

        foodEntry.SrNo = data.length + 1;
        data.push(foodEntry);

        const newSheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets["Foods"] = newSheet;
        workbook.SheetNames = ["Foods"];

        try {
            xlsx.writeFile(workbook, filePath);
        } catch (err) {
            const backupPath = path.join(__dirname, '..', `ffoods-backup-${Date.now()}.xlsx`);
            xlsx.writeFile(workbook, backupPath);
            console.warn(`Excel file saved as backup: ${backupPath}`);
        }

        res.status(201).json({ message: "Food added successfully", food });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get All Foods (Authenticated users)
exports.getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete Food (Admin only)
exports.deleteFood = async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json({ message: "Food deleted", deletedFood });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ error: "Server error" });
    }
};

