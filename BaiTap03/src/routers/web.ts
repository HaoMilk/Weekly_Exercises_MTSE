import { Router } from 'express';
import { homeController } from '../controllers/homeController';

const router = Router();

router.get('/', (_req, res) => res.redirect('/crud'));
router.get('/crud', homeController.renderCRUD);

router.post('/users', homeController.handleCreateUser);
router.get('/users', homeController.listUsers);
router.get('/users/:id/edit', homeController.renderUpdateUser);
router.post('/users/:id', homeController.handleUpdateUser);
router.post('/users/:id/delete', homeController.handleDeleteUser);

export default router;
