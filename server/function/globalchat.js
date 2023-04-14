import UserModel from "../Models/user.js"
import Image from "../Models/image.js"
import GlobalChatModel from "../Models/globalchat.js"

export const globalChatMessageUpload = async(req, res) => {
    try {
        const { userId, messageText, img } = req.body;
    
        const imgOfMessage = img ? await Image.create({ img }) : null;
    
        await GlobalChatModel.create({
          text: messageText || "",
          creator: userId,
          img: imgOfMessage ? imgOfMessage._id : null,
        });
      } catch (err) {
        throw err;
    }
}

export const globalChatMessageGet = async(req, res) => {
    try {
        const messageArray = await GlobalChatModel.find().populate('creator').populate('img');

        // Set prevoius message user 
        const userIdToPfpMap = {}; // Create a cache to store previously fetched profile images
        await Promise.all(messageArray.map(async (msg, i) => {
            const creatorId = msg.creator;
            let creator = null;

            // Check if the creator's profile image is already in the cache
            if (userIdToPfpMap[creatorId] && i > 0) {
                creator = await UserModel.findById(creatorId);
                creator.pfp = userIdToPfpMap[creatorId];
            } else {
                // Fetch the creator's profile image and add it to the cache
                creator = await UserModel.findById(creatorId).populate('pfp', 'img');
                userIdToPfpMap[creatorId] = creator.pfp;
            }

            messageArray[i].creator = creator;
        }));

        return res.status(200).send({messageArray})
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Serverfel uppstod"})
    }
}