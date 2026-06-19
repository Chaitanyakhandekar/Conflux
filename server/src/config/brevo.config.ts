import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
    apiKey: 'your-api-key',
    timeoutInSeconds: 30,
    maxRetries: 3,
});
