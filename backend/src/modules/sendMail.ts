import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

const contactFormEmail = async (email:string, message:string, contactType:string) => {
	let errors:string[] = [];
	const zacEmail = process.env.ZAC_EMAIL;
	if (!zacEmail) return {success: false, errors: errors};
	let html = "<h1>Code Tracker Contact Form</h1>";
	let text = "Code Tracker Contact Form\n";
	if (contactType === "bug") {
		html += "<h2>Bug Report</h2>"
		text += "Bug Report\n"
	} else if (contactType === "zac") {
		html += "<h2>Contact Zac</h2>"
		text += "Contact Zac\n"
	} else errors.push("invalid contactForm");
	if (errors.length === 0) {
		let sendMailSuccess = await sendMail([zacEmail], "Code Tracker Contact Form", html, text);
		if (sendMailSuccess) return {success: true, errors: errors};	
		errors.push("mail couldn't send");
	}
	return {success: false, errors: errors};	
}

const sendMail = async (toEmails:[string], subject:string, html:string, text:string) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL, // generated ethereal user
			pass: process.env.PASSWORD, // generated ethereal password
		},
	});
	let emailList = toEmails[0];
	for (let i=1; i<toEmails.length; i++) emailList += `, ${toEmails[i]}`;
	let info = await transporter.sendMail({
		from: `"Code Tracker - Zac Waite" <${process.env.EMAIL}>`, // sender address
		to: emailList, // list of receivers
		subject: subject, // Subject line
		text: text, // plain text body
		html: html, // html body
	});
	if (info.rejected.length>0) {
		console.log(`Mail Failed, ${subject}, ${Date.now}, ${JSON.stringify(info.rejected)} `);
		return false;
	} return true;
}

const emailConfirmation = async (confirmationCode:string, toEmail: string) => {
    const mailHtml = `
                <h1>Validate your email <a href='http://localhost:3000/confirmEmail?email=${toEmail}'>here</a></h1>
                <p>Confirmation Code: ${confirmationCode}</p>`;
    const mailText = `
                Validate your email here: http://localhost:3000/confirmEmail?email="${toEmail}"
                Confirmation Code: ${confirmationCode}`;
    sendMail([toEmail], "Validate Email - SE26 Code Tracker", mailHtml, mailText)
	.then((success) => {return success}).catch((_) => {return false});
}

export {emailConfirmation, contactFormEmail};