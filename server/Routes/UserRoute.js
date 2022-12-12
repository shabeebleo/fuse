import express from "express";
import { getUser } from "../Controllers/UserController.js";
import { updateUser } from "../Controllers/UserController.js";
import { deleteUser } from "../Controllers/UserController.js";
import { followUnFollowUser } from "../Controllers/UserController.js";
const router = express.Router();

router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUnFollowUser)
router.put('/:id/unfollow',followUnFollowUser)
export default router;
