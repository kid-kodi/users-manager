const User = require("../models/User");
const auth = require("../middleware/auth");
const router = require("express").Router();
const Utility = require("../helpers/utility");
const ErrorHanlder = require("../helpers/errorHandler");
const sendMail = require("../helpers/email");
const CatchAsyncError = require("../helpers/CatchAsyncError");

// User sign-up
router.post("/register", async (req, res, next) => {
  try {
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
      return next(new ErrorHanlder("Cette adresse exist déjà", 400));
    }

    const user = new User(req.body);
    const activation = Utility.generateActivationToken(user);
    let data = { user, activationCode: activation.activationCode };
    await sendMail({
      to: user.email,
      subject: "Activation du compte invoice92.",
      template: "activation-mail.ejs",
      data,
    });
    // await Email.sendVerificationEmail(user, req.get("origin"));
    res.status(201).json({
      success: true,
      message: `Please check your mail : ${user.email}, to activate your account`,
      activationToken: activation.token,
    });
  } catch (error) {
    next(new ErrorHanlder(error.message, 400));
  }
});

// ACTIVATE ACCOUNT
router.post(
  "/activation",
  CatchAsyncError(async (req, res, next) => {
    const { activation_token, activation_code } = req.body;
    const token = Utility.verifyActivationToken(activation_token);

    if (token.activationCode !== activation_code) {
      return next(new ErrorHanlder("Activation code invalide!", 400));
    }

    const isEmailExist = await User.findOne({ email: token.email });
    if (isEmailExist) {
      return next(new ErrorHanlder("Cette adresse exist déjà", 400));
    }

    const { email, password } = token;

    let user = new User({ email, password });
    await user.save();

    const access_token = user.signAccessToken();

    res.status(200).json({
      success: true,
      user,
      token: access_token,
    });

    try {
    } catch (error) {
      next(new ErrorHanlder(error.message, 400));
    }
  })
);

//User login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const access_token = await user.signAccessToken();
    res.status(200).json({
      success: true,
      user,
      token: access_token,
    });
  } catch (error) {
    next(error);
  }
});

// User logout
router.post("/logout", auth, async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Déconnexion successful" });
  } catch (e) {
    next(error);
  }
});

// Get user's profile
router.get(
  "/me",
  auth,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHanlder(error.message, 400));
    }
  })
);

// Update user's profile
router.put(
  "/me/update",
  auth,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHanlder(error.message, 400));
    }
  })
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(new ErrorHanlder("aucun utilisateur trouvé", 400));
      }

      user.resetToken = {
        token: Math.floor(1000 + Math.random() * 9000).toString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      await user.save();

      await sendMail({
        to: user.email,
        subject: "Changer de mot de passe invoice92.",
        template: "password-reset-mail.ejs",
        data: { user },
      });

      res.status(200).send({
        success: true,
        message:
          "Veuillez vérifier votre adresse électronique pour les instructions de réinitialisation du mot de passe",
      });
    } catch (error) {
      return next(new ErrorHanlder(error.message, 400));
    }
  })
);

// VERIFY ACCOUNT
router.post(
  "/verify-account",
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findOne({
        "resetToken.token": req.body.activation_code,
        "resetToken.expires": { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorHanlder("aucun utilisateur trouvé", 400));
      }

      // update password and remove reset token
      // user.password = req.body.password;
      // user.resetToken = undefined;
      await user.save();
      res.status(200).send({
        success: true,
        token: user.resetToken.token,
        message:
          "Réinitialisation du mot de passe réussie, vous pouvez maintenant vous connecter",
      });
    } catch (error) {
      return next(new ErrorHanlder(error.message, 400));
    }
  })
);
// RESET PASSWORD
router.post(
  "/reset-password",
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findOne({
        "resetToken.token": req.body.token,
        "resetToken.expires": { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorHanlder("aucun utilisateur trouvé", 400));
      }

      // update password and remove reset token
      user.password = req.body.password;
      user.resetToken = undefined;
      await user.save();
      res.status(200).send({
        success: true,
        message:
          "Réinitialisation du mot de passe réussie, vous pouvez maintenant vous connecter",
      });
    } catch (error) {
      return next(new ErrorHanlder(error.message, 400));
    }
  })
);

module.exports = router;
