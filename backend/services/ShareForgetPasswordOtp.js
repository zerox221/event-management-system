const { transporter } = require("./Email");
require("dotenv").config();

const forgetPasswordOtp = async (email, otp) => {
  console.log("email : ", email);
  console.log("otp : ", otp);
  try {
    await transporter.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Event Management system",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: email,
        },
      ],
      subject: "Forget password Otp",
      htmlContent: `
We received a request to reset the password for your account.
Use the following One-Time Password  to continue:
<div style="text-align:center; margin: 25px 0;">
  <div style="display:inline-block; padding:15px 30px; font-size:28px; font-weight:bold; letter-spacing:8px; background:#f3f4f6; border-radius:8px;">
    ${otp}
  </div>
</div>
This OTP is valid for 5 minutes.
For your security, please do not share this OTP with anyone**.
If you did not request a password reset, you can safely ignore this email.
Thank you,
**The Event management support Team**

      `,
    });
  } catch (error) {
    console.log("error in forget password otp handler : ", error.message);
  }
};

module.exports = forgetPasswordOtp;
