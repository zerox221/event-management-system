const { transporter } = require("./Email");

const sendQR = async (
  email,
  qrCode,
  name,
  eventName,
  registrationId
) => {
  try {
    const response =
      await transporter.transactionalEmails.sendTransacEmail({
        sender: {
          name: "Event Management System",
          email: process.env.EMAIL_USER,
        },

        to: [
          {
            email: email,
          },
        ],

        subject: "Event Registration Successful",

        htmlContent: `
          <h2>Hello ${name}</h2>

          <p>
            You have successfully registered for
            <b>${eventName}</b>.
          </p>

          <p>
            Registration ID:
            <b>${registrationId}</b>
          </p>

          <h3>Your Event QR Code</h3>

          <img 
            src="cid:qrcode"
            alt="QR Code"
            width="250"
            height="250"
          />

          <p>Please show this QR code at the event entrance.</p>
        `,
        
        attachment: [
          {
            content: qrCode.split(",")[1],
            name: "qrcode.png",
            cid: "qrcode",
          },
        ],
      });

    console.log("QR EMAIL SENT SUCCESSFULLY");

    return response;

  } catch (error) {
    console.log("QR EMAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = sendQR;