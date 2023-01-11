const User = require("../models/User");
const auth = require("../middleware/auth");
const router = require("express").Router();
const Utility = require("../helpers/utility");

// User sign-up
router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.verificationToken = Utility.randomTokenString();
    await user.save();
    // await Email.sendVerificationEmail(user, req.get("origin"));
    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
});

// User verify email
router.post("/verify-email", async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: req.body.token });
    if (!user) {
      res.status(201).send({ error: true, message: "" });
    }
    user.verified = Date.now();
    user.verificationToken = undefined;
    await user.save();
    res.status(201).send({ error: false, message: "" });
  } catch (error) {
    next(error);
  }
});

//User login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send(token);
  } catch (error) {
    next(error);
  }
});

// User logout
router.post("/logout", auth, async (req, res, next) => {
  try {
    let tokenIndex = req.user.tokens.findIndex((obj) => obj.token == req.token);
    // Here we keep the old token to be used as EasyLogin authenticator
    req.user.tokens[tokenIndex].status = "trashed";
    req.user.tokens[tokenIndex].easy_login_count = 0;

    await req.user.save();
    res.send();
  } catch (e) {
    next(error);
  }
});

// get me
router.get("/me", auth, async (req, res, next) => {
  try {
    console.log("OK");
    res.send(req.user);
  } catch (e) {
    next(error);
  }
});

// User forgot password
router.post("/forgot-password", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return;

    user.resetToken = {
      token: Utility.randomTokenString(),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    await user.save();
    await Email.sendPasswordResetEmail(user, req.get("origin"));
    res.status(201).send({
      message:
        "Veuillez vérifier votre adresse électronique pour les instructions de réinitialisation du mot de passe",
    });
  } catch (error) {
    next(error);
  }
});

// User reset password
router.post("/reset-password", async (req, res, next) => {
  try {
    const user = await User.findOne({
      "resetToken.token": req.body.token,
      "resetToken.expires": { $gt: Date.now() },
    });
    if (!user) throw new Error("Jeton invalide");

    // update password and remove reset token
    user.password = req.body.password;
    user.resetToken = undefined;
    await user.save();
    res.status(201).send({
      message:
        "Réinitialisation du mot de passe réussie, vous pouvez maintenant vous connecter",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
