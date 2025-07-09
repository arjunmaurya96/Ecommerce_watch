const { registerController, loginController, testController, forgotPasswordController, updateProfileController } = require("../controllers/authController");
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')
const router = require("express").Router();

router.post('/register', registerController)

// LOGIN 
router.post('/login', loginController)

// forgor password 
router.post('/forgot-password', forgotPasswordController)

// test route 
router.get('/test', requireSignIn, isAdmin, testController)
// Protected Route to Check if User is Logged In
router.get('/user-auth', requireSignIn, (req, res) => {
    try {
        return res.status(200).send({ ok: true });
    } catch (error) {
        console.error('Error in user-auth route:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
});
// admin route 
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    try {
        return res.status(200).send({ ok: true });
    } catch (error) {
        console.error('Error in user-auth route:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
});

// update profile 
router.put("/profile", requireSignIn, updateProfileController)



module.exports = router;

