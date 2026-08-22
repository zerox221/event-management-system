const { BrevoClient } = require("@getbrevo/brevo");
require("dotenv").config();

const transporter = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
  timeoutInSeconds: 30,
  maxRetries: 2,
});

const sendMessage = async (otp, email) => {
  console.log("otp function is called");
  console.log("Sending OTP to:", email);

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

        subject: "OTP VERIFICATION",

        htmlContent: `
          <html>
            <body>
              <p>Here is your OTP for verification</p>
              
              <h1>${otp}</h1>
              
              <p>OTP will expire in 2 minutes</p>
            </body>
          </html>
        `,
      });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", reponse.messageId);

    return reponse;
  } catch (error) {
    console.log("EMAIL SEND ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);

    if (error.statusCode) {
      console.log("STATUS CODE:", error.statusCode);
    }

    throw error;
  }
};

module.exports = {
  sendMessage,
  transporter,
};