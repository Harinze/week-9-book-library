import express from 'express';
import { bookCreation, updateBookFunction, getAllBooks, deleteBooks, getEachBook, getPage} from '../controllers/bookControllers';
import {auth} from '../services/authentication';

const router = express.Router();

router.post('/createbook', /**auth,**/ bookCreation)
router.put('/updatebook', /**auth, **/ updateBookFunction)
router.get('/getallbooks',/**  auth, **/ getAllBooks)
router.get('/getabook', /**auth,**/  getEachBook)
router.delete('/deletebook', /**auth, **/ deleteBooks)
router.get('/getpage', getPage)



export default router;