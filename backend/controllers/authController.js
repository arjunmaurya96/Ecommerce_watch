const { hashPassword, comparepassword } = require('../helper/authHelper');
const userModel = require('../models/UserModel');
const JWT = require("jsonwebtoken")


const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        // validations 
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is Required' })
        }

        // check user
        const exisitingUser = await userModel.findOne({ email: email })
        // exisiting user 
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please login"
            })
        }
        // register user 
        const hashedPassword = await hashPassword(password)
        // save 
        const user = new userModel({ name, email, phone, address, password: hashedPassword, answer })
        await user.save();
        res.status(201).send({
            success: true,
            message: 'User Register Successfully...!',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })

    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Register",
                error
            })
        }
        const match = await comparepassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                token

            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }

}


const testController = (req, res) => {
    console.log("protected Route")
    res.send("protected Route")
}

// export const userAuthController = (req, res) => {
//   try {
//     res.status(200).json({ ok: true });
//   } catch (error) {
//     console.error("Error in userAuthController:", error);
//     res.status(500).json({ ok: false, message: "Internal server error" });
//   }
// };

// const userAuthController = (req, res) => {
//     try {
//         res.status(200).json({ ok: true });
//     } catch (error) {
//         console.error("Error in userAuthController:", error);
//         res.status(500).json({ ok: false, message: "Internal server error" });

//     }
// }
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        console.log("Request Body:", req.body);
        // Basic validation
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "New password is required" });
        }
        // Find the user by email and answer
        const user = await userModel.findOne({ email, answer });
        console.log("User Found:", user);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer",
            });
        }
        // Hash new password
        const hashed = await hashPassword(newPassword);
        // Update password in DB
        user.password = hashed;
        await user.save();
        return res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Error in forgotPasswordController:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// const updateProfileController = async (req, res) => {
//     try {
//         const { name, email, password, address, phone } = req.body;
//         const user = await userModel.findById(req.user._id)
//         // password
//         if (password && password.length < 6) {
//             return res.json({ error: 'password is required and 6 character long' })
//         }
//         const hashedPassword = password ? await hashPassword(password) : undefined
//         const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
//             name: name || user.name,
//             password: hashedPassword || user.password,
//             phone: phone || user.phone,
//             address: address || user.address,

//         }, { new: true })

//         res.status(200).send({
//             success: true,
//             message: "Profile updated succefully",
//             updateUser
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({
//             success: false,
//             message: "Error while update profile",
//             error
//         })

//     }
// }




const updateProfileController = async (req, res) => {
    try {
        const { name, password, address, phone } = req.body;

        // Fetch current user
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Validate and hash password if provided
        let hashedPassword = user.password;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 6 characters long',
                });
            }
            hashedPassword = await hashPassword(password);
        }

        // Update user
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            updatedUser,
        });
    } catch (error) {
        console.error('Profile Update Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


module.exports = {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    // userAuthController
    updateProfileController
}