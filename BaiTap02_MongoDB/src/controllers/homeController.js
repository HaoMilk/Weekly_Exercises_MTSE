import {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserData,
  deleteUserById
} from "../services/CRUDService.js";

export const getHomePage = async (req, res) => {
  res.render("crud"); // form thêm user
};

export const postCRUD = async (req, res) => {
  try {
    await createNewUser(req.body);
    res.redirect("/users");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export const displayGetCRUD = async (req, res) => {
  const data = await getAllUsers();
  res.render("users/findAllUser", { data });
};

export const getEditCRUD = async (req, res) => {
  const user = await getUserById(req.query.id);
  if (!user) return res.status(404).send("User not found");
  res.render("users/updateUser", { user });
};

export const putCRUD = async (req, res) => {
  try {
    await updateUserData(req.body.id, req.body);
    res.redirect("/users");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export const deleteCRUD = async (req, res) => {
  try {
    await deleteUserById(req.query.id);
    res.redirect("/users");
  } catch (e) {
    res.status(400).send(e.message);
  }
};
