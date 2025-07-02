import nodemailer from "nodemailer";

interface welcomeMailInterface {
  to: string;
  username: string;
}

interface otpMailInterface {
  to: string;
  otp: string;
}

interface deleteAccountOtpInterface {
  username: string;
  to: string;
  otp: string;
}
export const sendWelcomeMail = async ({
  to,
  username,
}: welcomeMailInterface) => {
  try {
    if (
      !process.env.QUICK_BITE_MAIL_PASSWORD ||
      !process.env.QUICK_BITE_EMAIL
    ) {
      throw new Error("NO mail password found on .env.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.QUICK_BITE_EMAIL,
        pass: process.env.QUICK_BITE_MAIL_PASSWORD,
      },
    });

    const welcomeHTML = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to QuickBite</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333; }
      .container { max-width: 600px; background-color: #fff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      h1 { color: #ff5722; }
      p { line-height: 1.6; }
      .footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to QuickBite!</h1>
      <p>Hi ${username || "there"},</p>
      <p>Thank you for joining <strong>QuickBite</strong> — a smart and simple platform where local food stores can register themselves and accept orders for self-pickup.</p>
      <p>With QuickBite, customers like you can browse nearby stores, place orders in advance, and skip the wait by picking up your food when it’s ready — no delivery needed.</p>
      <p>We’re excited to have you on board and can’t wait for you to experience the convenience of QuickBite.</p>
      <p>If you have any questions or need assistance, feel free to reply to this email or contact our support team at <a href="mailto:support@quickbite.com">support@quickbite.com</a>.</p>
      <p>Enjoy your QuickBite experience!</p>
      <p>Best regards,<br/>The QuickBite Team</p>
      <div class="footer">&copy; 2025 QuickBite. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;

    await transporter.sendMail({
      from: `"Quick Bite" <${process.env.QUICK_BITE_EMAIL}>`,
      to,
      subject: "Welcome to QuickBite!",
      html: welcomeHTML,
    });
  } catch (err) {
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Deletion Confirmation</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333; }
      .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      h1 { color: #ff5722; }
      .otp-code { font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px 20px; border-radius: 6px; letter-spacing: 3px; display: inline-block; margin: 20px 0; }
      .footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Confirm Account Deletion</h1>
      <p>Hi ${userName || "there"},</p>
      <p>We received a request to delete your QuickBite account. To confirm this action, please use the OTP code below:</p>
      <div class="otp-code">${otp}</div>
      <p><strong>Important:</strong> This OTP is valid for the next 10 minutes. If you didn’t request account deletion, please ignore this message and contact support immediately.</p>
      <p>We’re sorry to see you go. If there’s anything we can do to improve your experience, don’t hesitate to let us know.</p>
      <p>— The QuickBite Team</p>
      <div class="footer">&copy; 2025 QuickBite. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
    console.log("Error while sending Email : ", err);
    throw new Error("Error while sending email.");
  }
};

export const otpMail = async ({ to, otp }: otpMailInterface) => {
  try {
    if (
      !process.env.QUICK_BITE_MAIL_PASSWORD ||
      !process.env.QUICK_BITE_EMAIL
    ) {
      throw new Error("NO mail password found on .env.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.QUICK_BITE_EMAIL,
        pass: process.env.QUICK_BITE_MAIL_PASSWORD,
      },
    });

    const otpHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #ff5722; }
    .otp-code { font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px 20px; border-radius: 6px; letter-spacing: 3px; display: inline-block; margin: 20px 0; }
    .footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; }
  </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hi there,</p>
      <p>We received a request to reset your password for your QuickBite account.</p>
      <p>Please use the following One-Time Password (OTP) to reset your password:</p>
      <div class="otp-code">${otp}</div>
      <p>This OTP is valid for the next 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
      <p>Stay safe,<br/>The QuickBite Team</p>
      <div class="footer">&copy; 2025 QuickBite. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
    await transporter.sendMail({
      from: `"Quick Bite" <${process.env.QUICK_BITE_EMAIL}>`,
      to,
      subject: "Welcome to QuickBite!",
      html: otpHTML,
    });
  } catch (err) {
    console.log("Error while sending Email : ", err);
    throw new Error("Error while sending email.");
  }
};

export const deleteAccountOtp = async ({
  to,
  otp,
  username,
}: deleteAccountOtpInterface) => {
  try {
    if (
      !process.env.QUICK_BITE_MAIL_PASSWORD ||
      !process.env.QUICK_BITE_EMAIL
    ) {
      throw new Error("NO mail password found on .env.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.QUICK_BITE_EMAIL,
        pass: process.env.QUICK_BITE_MAIL_PASSWORD,
      },
    });

    const deleteAccountHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Deletion Confirmation</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333; }
      .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      h1 { color: #ff5722; }
      .otp-code { font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px 20px; border-radius: 6px; letter-spacing: 3px; display: inline-block; margin: 20px 0; }
      .footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Confirm Account Deletion</h1>
      <p>Hi ${username || "there"},</p>
      <p>We received a request to delete your QuickBite account. To confirm this action, please use the OTP code below:</p>
      <div class="otp-code">${otp}</div>
      <p><strong>Important:</strong> This OTP is valid for the next 10 minutes. If you didn’t request account deletion, please ignore this message and contact support immediately.</p>
      <p>We’re sorry to see you go. If there’s anything we can do to improve your experience, don’t hesitate to let us know.</p>
      <p>— The QuickBite Team</p>
      <div class="footer">&copy; 2025 QuickBite. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
    await transporter.sendMail({
      from: `"Quick Bite" <${process.env.QUICK_BITE_EMAIL}>`,
      to,
      subject: "Welcome to QuickBite!",
      html: deleteAccountHTML,
    });
  } catch (err) {
    console.log("Error while sending Email : ", err);
    throw new Error("Error while sending email.");
  }
};
