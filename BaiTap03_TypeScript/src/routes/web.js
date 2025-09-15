const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/', homeController.getHomePage);
router.post('/post-crud', homeController.postCRUD);
router.get('/get-crud', homeController.displayGetCRUD);
router.get('/edit-crud', homeController.getEditCRUD);
router.post('/put-crud', homeController.putCRUD); // dùng POST + hidden _method nếu muốn
router.post('/delete-crud', homeController.deleteCRUD);
router.get('/delete-crud', homeController.deleteCRUD);


module.exports = router;