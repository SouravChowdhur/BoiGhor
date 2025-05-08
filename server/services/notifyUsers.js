import cron from 'node-cron';
import {Borrow} from "../models/borrowModel.js"
import {User} from "../models/userModel.js"
import { sendEmail } from '../utils/sendEmai.js';

export const notifyUsers = ()=>{
    cron.schedule('*/30 * * * *', async() => {
        try{
            const oneDayAgo = new Date(Date.now() - 24*60*60*1000);
            const borrowers = await Borrow.find({
                dueDate: {
                    $lt: oneDayAgo
                },
                returnedDate: null,
                notified: false,
            })
            for(const element of borrowers){
                if(element.user && element.user.email){
                    const user = await User.findById(element.user.id);
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return Remainder",
                        message: `Dear ${element.user.name},

Hope you're enjoying your book! Just a quick reminder — it's due back soon.

To avoid late fees and help others enjoy it too, please return it on time.

If you’ve already returned it, feel free to ignore this message.

Thanks for being an awesome reader!  
📚 Happy Reading,  
– Your Library Team
`
                    })
                    element.notified = true;
                    await element.save();
                    console.log(`email to sent ${element.user.email}`)
                }
            }
        }
        catch(error){
             console.error("some error occurred", error);
        }
    });
}