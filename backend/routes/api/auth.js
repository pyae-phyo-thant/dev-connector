const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypy = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

router.get("/me", auth, (req, res) => res.send(res.user));

router.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "password is require").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid login information !" }] });
      }

      const isMatch = await bcrypy.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
