import db from '../models';

export type UserInput = {
  id?: number | string;
  _id?: number | string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  gender?: string;
};

export async function createNewUser(data: UserInput) {
  const user = await db.User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    gender: data.gender
  });
  return user.toJSON();
}

export async function getAllUsers() {
  const users = await db.User.findAll({ order: [['id', 'DESC']] });
  return users.map((u: any) => {
    const json = u.toJSON();
    return { _id: json.id, ...json };
  });
}

export async function getUserById(id: number | string) {
  const u = await db.User.findByPk(id);
  if (!u) return null;
  const json = u.toJSON();
  return { _id: json.id, ...json };
}

export async function updateUser(data: UserInput) {
  const identifier = (data.id ?? data._id) as number | string | undefined;
  if (identifier === undefined) return null;
  const u = await db.User.findByPk(identifier);
  if (!u) return null;
  await u.update({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    gender: data.gender
  });
  const json = u.toJSON();
  return { _id: json.id, ...json };
}

export async function deleteUser(id: number | string) {
  const deleted = await db.User.destroy({ where: { id } });
  return deleted > 0;
}


