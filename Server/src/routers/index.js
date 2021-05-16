const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const {
  getUsers,
  addUser,
  updateUser,
  deleteUsers,
} = require("../controllers/users");
router.get("/users", getUsers);
router.post("/user", addUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUsers);

const { regitrasi, login } = require("../controllers/auth");
router.post("/register", regitrasi);
router.post("/login", login);

const { getUser, getUserDetail, deleteUser } = require("../controllers/user");
router.get("/userss", auth, getUser);
router.get("/userss/:id", getUserDetail);
router.delete("/userss/:id", deleteUser);

const {
  getFund,
  getFundsDetail,
  createFund,
  updateFund,
  deleteFund,
  updateDonate,
} = require("../controllers/fund");
const {
  getDonate,
  createDonate,
  deleteDonate,
} = require("../controllers/donate");
router.get("/funds", getFund);
router.get("/fund/:id", getFundsDetail);
router.get("/donates", getDonate);
router.post("/fund", uploadFile("thumbnail"), createFund);
router.post("/donate", uploadFile("proofAttachment"), createDonate);
router.delete("/fund/:id", deleteFund);
router.delete("/donate/:id", deleteDonate);

module.exports = router;
