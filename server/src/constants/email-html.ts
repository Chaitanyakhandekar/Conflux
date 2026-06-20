export const getEmailVerificationHtml = (code: string): string => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account</title>
</head>

<body
    style="
        margin: 0;
        padding: 0;
        background-color: #f4f7fb;
        font-family: Arial, Helvetica, sans-serif;
    "
>

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="padding: 40px 20px;"
    >
        <tr>
            <td align="center">

                <!-- Main Container -->
                <table
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                        background: #ffffff;
                        border-radius: 14px;
                        overflow: hidden;
                        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                    "
                >

                    <!-- Header -->
                    <tr>
                        <td
                            align="center"
                            style="
                                background: #5865F2;
                                padding: 35px;
                                color: white;
                            "
                        >
                            <h1
                                style="
                                    margin: 0;
                                    font-size: 28px;
                                    letter-spacing: 1px;
                                "
                            >
                                CONFLUX
                            </h1>

                            <p
                                style="
                                    margin-top: 8px;
                                    opacity: 0.9;
                                    font-size: 14px;
                                "
                            >
                                Secure Communication Platform
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">

                            <h2
                                style="
                                    margin-top: 0;
                                    color: #222;
                                "
                            >
                                Verify Your Email Address
                            </h2>

                            <p
                                style="
                                    color: #555;
                                    line-height: 1.6;
                                    font-size: 15px;
                                "
                            >
                                Welcome to <strong>Conflux</strong>.
                                To complete your registration and activate your account,
                                please use the verification code below.
                            </p>

                            <!-- OTP Box -->
                            <div
                                style="
                                    margin: 35px 0;
                                    text-align: center;
                                "
                            >
                                <div
                                    style="
                                        display: inline-block;
                                        background: #f3f5ff;
                                        border: 2px dashed #5865F2;
                                        padding: 18px 40px;
                                        border-radius: 12px;
                                        font-size: 32px;
                                        letter-spacing: 8px;
                                        font-weight: bold;
                                        color: #5865F2;
                                    "
                                >
                                    ${code}
                                </div>
                            </div>

                            <p
                                style="
                                    color: #555;
                                    line-height: 1.6;
                                    font-size: 15px;
                                "
                            >
                                This code will expire in
                                <strong>10 minutes</strong>.
                            </p>

                            <p
                                style="
                                    color: #555;
                                    line-height: 1.6;
                                    font-size: 15px;
                                "
                            >
                                If you did not request this verification,
                                please ignore this email.
                            </p>

                            <!-- Security Warning -->
                            <div
                                style="
                                    margin-top: 30px;
                                    padding: 16px;
                                    background: #fff8e6;
                                    border-left: 4px solid #ffb400;
                                    border-radius: 6px;
                                "
                            >
                                <p
                                    style="
                                        margin: 0;
                                        color: #666;
                                        font-size: 14px;
                                    "
                                >
                                    For security reasons,
                                    never share this verification code with anyone.
                                </p>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            align="center"
                            style="
                                padding: 25px;
                                background: #f8f9fc;
                                color: #888;
                                font-size: 13px;
                            "
                        >

                            <p style="margin: 0;">
                                © 2026 Conflux. All rights reserved.
                            </p>

                            <p style="margin-top: 8px;">
                                This is an automated email.
                                Please do not reply.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>

`
}