// src/controllers/homeController.js
import {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
    } from '../services/CRUDService.js';
    
    
    export async function getCRUD(req, res) {
    return res.render('crud.ejs');
    }

    export async function getAboutPage(req, res) {
    return res.send('About page');
    }

    export async function getHomePage(req, res) {
    return res.render('crud.ejs');
    }
    
    
    export async function postCRUD(req, res) {
    try {
    await createNewUser(req.body);
    return res.redirect('/get-crud');
    } catch (e) {
    return res.status(400).send(e.message || 'Create failed');
    }
    }
    
    
    export async function displayGetCRUD(req, res) {
    const users = await getAllUsers();
    return res.render('users/findAllUser.ejs', { users });
    }
    
    
    export async function getEditCRUD(req, res) {
    const id = req.query.id;
    if (!id) return res.redirect('/get-crud');
    const user = await getUserById(id);
    if (!user) return res.redirect('/get-crud');
    return res.render('users/updateUser.ejs', { user });
    }
    
    
    export async function putCRUD(req, res) {
    try {
    await updateUser(req.body);
    return res.redirect('/get-crud');
    } catch (e) {
    return res.status(400).send(e.message || 'Update failed');
    }
    }
    
    
    export async function deleteCRUD(req, res) {
    try {
    const { id } = req.body;
    if (id) await deleteUserById(id);
    return res.redirect('/get-crud');
    } catch (e) {
    return res.status(400).send(e.message || 'Delete failed');
    }
    }