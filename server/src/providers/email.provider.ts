import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: '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' });

export const sendEmail = async () => {
    const result = await brevo.transactionalEmails.sendTransacEmail({
        subject: 'Hello from Brevo!',
        htmlContent: '<html><body><p>Hello,</p><p>This is my first transactional email.</p></body></html>',
        sender: { name: 'Alex from Brevo', email: 'bytecoder95@gmail.com' },
        to: [{ email: 'chaitanyakhandekar95@gmail.com', name: 'John Doe' }],
    });

    console.log('Email sent. Message ID:', result.messageId);
}
