import { User } from '../models/User';

export const CRUDService = {
  createUser: async (payload: { firstName: string; lastName: string; email: string; address?: string }) => {
    return User.create(payload);
  },

  getAllUsers: async () => {
    return User.findAll({ order: [['id', 'DESC']] });
  },

  getUserById: async (id: number) => {
    return User.findByPk(id);
  },

  updateUser: async (id: number, payload: Partial<{ firstName: string; lastName: string; email: string; address: string }>) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(payload);
    return user;
  },

  deleteUser: async (id: number) => {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
};
