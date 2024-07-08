import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';

export function sendEmail(options) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mouhanad.ahmed2@gmail.com',
      pass: 'cqhcghsyxedjnqjn'
    }
  });


  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Mouhanad 👻" <mouhanad.ahmed2@gmail.com>', // sender address
      to: options.email, // list of receivers
      subject: options.sub, // Subject line
    //   text: "Hello world?", // plain text body
      html:emailTemplate(options.api,options.text,options.title,options.btn), // html body
    });
  
    // console.log("Message sent: %s", info.messageId,typeof options.text,options.title );
   
  }
  
  main().catch(console.error);
}