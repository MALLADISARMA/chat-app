import express from "express";
import protectRoute from '../middleware/protectRoute.js';
import { getusersforsidebar } from "../controllers/user.controller.js";
const router=express.Router();

router.get("/",protectRoute,getusersforsidebar);



export default router;