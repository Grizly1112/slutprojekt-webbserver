// Src res.status meaning and defintion https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
import {bcrpy} from 'bcrypt';

// https://youtu.be/V8dYGNfHjfk
const userRegister = async (req, res) => {
    const user = req.body;
  
    // console.log(req.body);
    // console.log("ue");
    // https://mongoosejs.com/docs/promises.html

    try {
        const hashedPassword = await brypt.hash(user.password, 12);
        console.log(hashedPassword)
        // let userCreated = await UserModel.create({username: user.username, password: hashedPassword, email: user.email})

        // console.log(userCreated)
    } catch (err) {
        throw err;
    }



}

export default userRegister;