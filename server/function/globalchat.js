import UserModel from "../Models/user.js"
import Image from "../Models/image.js"
import GlobalChatModel from "../Models/globalchat.js"

export const globalChatMessageUpload = async(req, res) => {
    try {
        const { userId, messageText, img } = req.body;

        var imgOfMessage = null;

        if (img) {
            // const imageData = Buffer.from(img, 'base64'); // Convert Base64 to binary data
            const buffer = Buffer.from(img.split(',')[1], 'base64');
            imgOfMessage = await Image.create({ data: buffer}); // Create new Image document with binary data
        }

        if(img || messageText) {
            await GlobalChatModel.create({
                text: messageText,
                creator: userId,
                img: imgOfMessage ? imgOfMessage._id : null,
            });
        }
      } catch (err) {
        throw err;
    }
}


export const globalChatMessageGet = async(req, res) => {
  try {
      const messageArray = await GlobalChatModel.find().populate({
        path: 'creator',
        populate: { path: 'pfp' },
      }).populate('img').lean();
  
      return res.status(200).send({ messageArray });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Serverfel uppstod' });
    }
}