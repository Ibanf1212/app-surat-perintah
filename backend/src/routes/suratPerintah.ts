import { Router } from 'express';
import * as suratController from '../controllers/suratPerintahController';
import { authMiddleware, authorize } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', suratController.createSuratPerintah);
router.get('/', suratController.listSuratPerintah);
router.get('/:id', suratController.getSuratPerintah);
router.put('/:id', suratController.updateSuratPerintah);
router.post('/:id/approve', authorize(['approver', 'admin']), suratController.approveSuratPerintah);
router.delete('/:id', suratController.deleteSuratPerintah);

export default router;
