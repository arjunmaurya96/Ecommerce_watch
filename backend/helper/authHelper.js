const bcrypt = require("bcrypt")

const hashPassword = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }

}

const comparepassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}

module.exports ={
    hashPassword,
    comparepassword
}