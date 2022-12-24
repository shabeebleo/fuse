import express from "express";
import { getUser } from "../Controllers/UserController.js";
import { updateUser } from "../Controllers/UserController.js";
import { deleteUser } from "../Controllers/UserController.js";
import { followUnFollowUser } from "../Controllers/UserController.js";
import { getAllUsers } from "../Controllers/UserController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/',protect,getUser)
router.get('/getAllUsers',getAllUsers)
router.put('/:id',protect,updateUser)
router.delete('/:id',protect,deleteUser)
router.put('/:id/follow',protect,followUnFollowUser)
router.put('/:id/unfollow',protect,followUnFollowUser)
export default router;
