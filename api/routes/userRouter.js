
import { Router } from "express";
import {registerUser,userData,contactData,updateData,userNameData} from '../controller/userController.js'

const router=Router();

router.route('/register').post(registerUser);
router.route('/userdata').get(userData);
router.route('/contactdata').get(contactData);
router.route('/updatedata').put(updateData);
router.route('/username').get(userNameData);

export default router;