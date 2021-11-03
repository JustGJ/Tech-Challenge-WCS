import express from 'express';
import * as memberController from '../controllers/member.controller';

const router = express.Router();

router.get('/', memberController.getAllMembers);
router.put('/', memberController.addMember);
router.delete('/:id', memberController.deleteMember);

export default router;
