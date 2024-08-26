import { Router } from "express";
import { sendFriendRequest,acceptFriendRequest,rejectFriendRequest } from "../controller/friendController.js";

const router=Router();
router.route('/sendfriendrequest').post(sendFriendRequest);
router.route('/acceptfriendrequest').post(acceptFriendRequest);
router.route('/rejectfriendrequest').post(rejectFriendRequest);

export default router;