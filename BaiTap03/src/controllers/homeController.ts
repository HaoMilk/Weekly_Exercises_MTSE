import { Request, Response } from 'express';
import { CRUDService } from '../services/CRUDService';

export const homeController = {
  renderCRUD: async (_req: Request, res: Response) => {
    res.render('crud');
  },

  handleCreateUser: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, address } = req.body;
      await CRUDService.createUser({ firstName, lastName, email, address });
      res.redirect('/users');
    } catch (e: any) {
      res.status(400).send(e?.message || 'Create failed');
    }
  },

  listUsers: async (_req: Request, res: Response) => {
    const users = await CRUDService.getAllUsers();
    res.render('users/findAllUser', { users });
  },

  renderUpdateUser: async (req: Request, res: Response) => {
    const user = await CRUDService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.render('users/updateUser', { user });
  },

  handleUpdateUser: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await CRUDService.updateUser(id, req.body);
    res.redirect('/users');
  },

  handleDeleteUser: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await CRUDService.deleteUser(id);
    res.redirect('/users');
  }
};
