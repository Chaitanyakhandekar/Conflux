import { BrevoClient } from '@getbrevo/brevo';
import { emailJobType } from '../types/job.type.ts';
import { env } from '../config/env.config.ts';

const brevo = new BrevoClient({ apiKey: env.BREVO_API_KEY });

/**
 * @description Service for sending mail
 * @provider Brevo
 * @param email 
 */
export const sendEmail = async (email: emailJobType) => {
    console.log('Sending Email');

    try {

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: email.subject,
            htmlContent: email.html,
            sender: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER_EMAIL },
            to: [{ email: email.to.email, name: email.to.name || "" }],
        });

        console.log('Email sent. Message ID:', result?.messageId);

    } catch (error: unknown) {

        if (error instanceof Error) {
            console.log('Error : Emial :: ', error.message);
        }

        console.log('Error : Emial :: ', error);

    }

}
