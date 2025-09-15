import { Request, Response, NextFunction } from 'express';
import * as CRUDService from '../services/CRUDService';

export function getHomePage(req: Request, res: Response) {
  res.render('crud');
}

export async function postCRUD(req: Request, res: Response, next: NextFunction) {
  try {
    await CRUDService.createNewUser(req.body);
    res.redirect('/get-crud');
  } catch (e) { next(e as Error); }
}

export async function displayGetCRUD(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CRUDService.getAllUsers();
    res.render('users/findAllUser', { users: data });
  } catch (e) { next(e as Error); }
}

export async function getEditCRUD(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.query.id as string) || '';
    const userData = await CRUDService.getUserById(userId);
    if (!userData) return res.status(404).send('User not found');
    res.render('users/updateUser', { user: userData });
  } catch (e) { next(e as Error); }
}

export async function putCRUD(req: Request, res: Response, next: NextFunction) {
  try {
    await CRUDService.updateUser(req.body);
    res.redirect('/get-crud');
  } catch (e) { next(e as Error); }
}

export async function deleteCRUD(req: Request, res: Response, next: NextFunction) {
  try {
    const id = (req.body.id as string) || (req.query.id as string);
    await CRUDService.deleteUser(id);
    res.redirect('/get-crud');
  } catch (e) { next(e as Error); }
}

