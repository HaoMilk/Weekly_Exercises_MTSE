const CRUDService = require('../services/CRUDService');


function getHomePage(req, res) {
res.render('crud');
}


async function postCRUD(req, res, next) {
try {
await CRUDService.createNewUser(req.body);
res.redirect('/get-crud');
} catch (e) { next(e); }
}


async function displayGetCRUD(req, res, next) {
try {
const data = await CRUDService.getAllUsers();
res.render('users/findAllUser', { users: data });
} catch (e) { next(e); }
}


async function getEditCRUD(req, res, next) {
try {
const userId = req.query.id;
const userData = await CRUDService.getUserById(userId);
if (!userData) return res.status(404).send('User not found');
res.render('users/updateUser', { user: userData });
} catch (e) { next(e); }
}


async function putCRUD(req, res, next) {
try {
await CRUDService.updateUser(req.body);
res.redirect('/get-crud');
} catch (e) { next(e); }
}


async function deleteCRUD(req, res, next) {
try {
const id = req.body.id || req.query.id;
await CRUDService.deleteUser(id);
res.redirect('/get-crud');
} catch (e) { next(e); }
}


module.exports = {
getHomePage,
postCRUD,
displayGetCRUD,
getEditCRUD,
putCRUD,
deleteCRUD
};