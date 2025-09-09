import { Router } from "express";
import {
  getHomePage,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD
} from "../controllers/homeController.js";

const router = Router();

router.get("/", getHomePage);
router.post("/post-crud", postCRUD);

router.get("/users", displayGetCRUD);
router.get("/edit-crud", getEditCRUD);
router.post("/put-crud", putCRUD);      // dùng POST cho đơn giản (hoặc PUT + method-override)
router.get("/delete-crud", deleteCRUD); // hoặc DELETE + method-override

export default router;
