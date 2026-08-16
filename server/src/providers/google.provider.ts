import { OAuth2Client, TokenPayload } from "google-auth-library";
import { env } from "../config/env.config";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(idToken: string): Promise<TokenPayload> {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket.getPayload();
}