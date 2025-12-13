import express, { NextFunction, Response } from 'express';
import { authenticationMiddleWare } from '../../../di/container';
import { IAuthenticatedRequest } from '../../../infrastructure/interface/IAuthenticatedRequest';
import { chatController } from '../../../di/common/chat/container';
import { reportController } from '../../../di/common/report/container';
const router = express.Router();

router.post(
  '/private',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    chatController.startPrivateChat(req, res, next)
);
router.get(
  '/community/:eventId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    chatController.getCommunityChat(req, res, next)
);
router.get(
  '/messages/:conversationId',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    chatController.getMessages(req, res, next)
);
router.post(
  '/send',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    chatController.sendMessage(req, res, next)
);
router.post(
  '/report/chat-message',
  authenticationMiddleWare.authenticateUser.bind(authenticationMiddleWare),
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    reportController.CreateChatMessageReport(req, res, next)
);

export default router;
