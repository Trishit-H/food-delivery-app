// importing external modules
const express = require('express');
const multer = require('multer');


// importing internal modules
const {
    handleAddFoodItem,
    handleListFoodItems,
    handleRemoveFoodItem
} = require('../controllers/foodController.js');


const router = express.Router();


// image storage configuration
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single('image'), handleAddFoodItem);
router.get('/list', handleListFoodItems);
router.post('/remove', handleRemoveFoodItem);



module.exports = router;