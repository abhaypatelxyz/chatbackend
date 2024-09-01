import { Router } from "express";
import{sendMessage,getMessage} from '../controller/chatController.js';

const router=Router();

router.route('/send').post(sendMessage);
router.route('/get').get(getMessage);
export default router;