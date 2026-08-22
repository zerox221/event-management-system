const { transporter } = require("./Email");

const sendQR = async (
  email,
  qrCode,
  name,
  eventName,
  registrationId
) => {
  try {
    const reponse =
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

          <p>You have successfully registered for <b>${eventName}</b>.</p>

          <p>Registration ID: <b>${registrationId}</b></p>

          <img src="${qrCode}" alt="QR Code" />

          <p>Please show this QR code at the event entrance.</p>
        `,
      });

    console.log("QR EMAIL SENT SUCCESSFULLY");

    return reponse;
  } catch (error) {
    console.log("QR EMAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = sendQR;