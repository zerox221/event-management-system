const { transporter } = require("./Email");

const sendQR = async(email,qrCode,name,eventName,registrationId)=>{
    await transporter.sendMail({
    to: email,
    from: process.env.GMAIL,
    subject: "Event Registration Successful",
    html: `
        <h2>Hello ${name}</h2>
        <p>You have successfully registered for <b>${eventName}</b>.</p>
        <p>Registration ID: <b>${registrationId}</b></p>
        <img src="cid:qrcode" alt="QR Code" />
        <p>Please show this QR code at the event entrance.</p>
    `,
    attachments: [
        {
            filename: "qrcode.png",
            content: qrCode.replace(/^data:image\/png;base64,/, ""),
            encoding: "base64",
            cid: "qrcode",
        },
    ],
});
}

module.exports = sendQR