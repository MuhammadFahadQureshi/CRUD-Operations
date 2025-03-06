import { Router } from "express"
import { signup,login, getUsers, getUserById, updateUser, deleteUser } from "../Controllers/authController.js";


const router = Router();

router.post("/auth/signup",signup);
router.post("/auth/login",login);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
