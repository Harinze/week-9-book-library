import express from 'express';
import { userCreation, login, updateUsers, deleteUser, getEachUser, getAllUsers} from '../controllers/usersControllers';

const router = express.Router();

router.post('/usersignup', userCreation)
router.post('/login', login)
router.put('/updateuser', updateUsers)
router.delete('/deleteuser', deleteUser)
router.get('/geteachuser', getEachUser)
router.get('/getallusers', getAllUsers)


export default router;