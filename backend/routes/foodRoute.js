import express from "express";
import { addFood, getAllFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("Multer processing file:", file.originalname);
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

foodRouter.get("/list", getAllFood);
foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
