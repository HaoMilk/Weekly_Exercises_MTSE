// src/routes/web.js
import express from 'express';
import {
getHomePage,
postCRUD,
displayGetCRUD,
getEditCRUD,
putCRUD,
deleteCRUD,
getCRUD,
getAboutPage,
} from '../controllers/homeController.js';


const router = express.Router();


router.get('/', getHomePage); // form tạo mới
router.get('/about', getAboutPage); // about
router.get('/crud', getCRUD);// danh sách crud
router.post('/post-crud', postCRUD); // tạo
router.get('/get-crud', displayGetCRUD);// danh sách
router.get('/edit-crud', getEditCRUD); // view sửa (?id=...)
router.post('/put-crud', putCRUD); // cập nhật
router.post('/delete-crud', deleteCRUD);// xóa


export default router;