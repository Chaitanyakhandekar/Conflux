import { BrevoClient } from '@getbrevo/brevo';
import { emailJobType } from '../types/job.type.ts';

const brevo = new BrevoClient({ apiKey: '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' });

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
            sender: { name: 'Chaitanya from Conflux', email: 'bytecoder95@gmail.com' },
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
