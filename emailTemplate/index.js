module.exports = {
  email: (baseurl, jwt) =>
    ` <html>
    <head>
        <title>Reset Your Password</title>
    </head>
    <body style="margin: 0; padding: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 16px; background-color: whitesmoke;">
        <div  style="width: 80%; padding: 20px; background-color: #ffffff;">
            <div  style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px;">
                <div  style="text-align: center; margin-bottom: 20px;">
                   
                </div>
                <div  style="font-size: 24px; margin-bottom: 20px;">
                    Reset Your Password
                </div>
                <div  style="font-size: 20px; line-height: 1.5; margin-bottom: 20px;">
                    Hello,<br><br>
                    We received a request to reset your password. Click the button below to reset it.
                </div>
                <a href=${baseurl}?token=${jwt} style="display: block; width: 200px; margin: 0 auto; padding: 10px 0; background-color: #007BFF; color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <div style="font-size: 16px; margin-top: 10px; text-align: center;">
                 <div style="font-size: 16px; margin-top: 10px; text-align: center;">
                This link is valid for 5 minutes and will expire at ${new Date(
                  Date.now() + 5 * 60 * 1000
                ).toLocaleTimeString()}.
             </div>
                </div>
            </div>
        </div>
    </body>
    </html>
      `,
};
