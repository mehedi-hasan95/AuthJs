import { Resend } from "resend";
import nodemailer from "nodemailer";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verification Email",
    html: `<p>Please <a href="${confirmLink}">confirm</a> the email</p>`,
  });
};

// // Reset password for forgot password
// export const sendForgotPasswordEmail = async (email: string, token: string) => {
//   const confirmLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Reset Password",
//     html: `<p>Please click to <a href="${confirmLink}">confirm</a> reset your password</p>`,
//   });
// };

// Using nodemailer
const transporter = nodemailer.createTransport({
  host: "mail.teamrabbil.com",
  port: 25,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "info@teamrabbil.com",
    pass: "~sR4[bhaC[Qs",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${token}`;
  const info = await transporter.sendMail({
    from: "info@teamrabbil.com",
    to: email,
    subject: "Reset Password",
    html: `<p>Please click to <a href="${confirmLink}">confirm</a> reset your password</p>`,
  });
};
