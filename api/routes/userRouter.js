
import { Router } from "express";
import {registerUser,userData,contactData,updateData,userNameData,updateOnlineStatus} from '../controller/userController.js'

const router=Router();

router.route('/register').post(registerUser);
router.route('/userdata').get(userData);
router.route('/contactdata').get(contactData);
router.route('/updatedata').post(updateData);
router.route('/username').get(userNameData);
router.route('/updateonline').post(updateOnlineStatus);

export default router;