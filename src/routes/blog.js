const express = require("express");
const router = express.Router();

const blogController = require("../app/controllers/BlogController");

const path = {
      index: "/", // đường dẫn truy cập vào trang danh sách blog
      detail: "/:slug", // đường dẫn truy cập vào trang chi tiết blog
      add: "/add", // đường dẫn truy cập vào trang thêm blog
      submitAdd: "/add/submit", // đường dẫn submit thêm blog
      edit: "/edit/:id", // đường dẫn truy cập vào trang thêm blog
      submitEdit: "/:id", // đường dẫn submit thêm blog
      delete: "/:id", // đường dẫn soft delete
      trash: "/trash", // đường dẫn truy cập trang thùng rác
      restore: "/:id/restore", // khôi phục
      destroy: "/:id/force", // xóa vĩnh viễn,
      formAction: "/form-action", // xóa vĩnh viễn,
};

// form-action
router.post(path.formAction, blogController.formAction);
// ui add
router.get(path.add, blogController.add);
// submit add
router.post(path.submitAdd, blogController.submitAdd);
// ui trash
router.get(path.trash, blogController.trash);
// ui edit
router.get(path.edit, blogController.edit);
// submit edit
router.put(path.submitEdit, blogController.submitEdit);
// delete permanently
router.delete(path.destroy, blogController.destroy);
// soft delete
router.delete(path.delete, blogController.delete);
// restore
router.patch(path.restore, blogController.restore);
// get detail
router.get(path.detail, blogController.detail);
// index -> show list
router.get(path.index, blogController.index);

module.exports = router;
