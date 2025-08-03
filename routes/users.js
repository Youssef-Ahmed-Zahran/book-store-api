const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

// Http Methods / Verbs

router.get("/", verifyTokenAndAdmin, getAllUsers);

router
  .route("/:id")
  .get(verifyTokenAndAdmin, getUserById)
  .put(verifyTokenAndAuthorization, updateUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

module.exports = router;
