import jwt from 'jsonwebtoken';

export default function authorization(requestToken: string | undefined) {
    if (!process.env.JWT_KEY) return false;
    if (!requestToken) return false;
    const token = requestToken.slice(7);

    let error;
    jwt.verify(token, process.env.JWT_KEY, { complete: true }, e => {
        error = e;
    });
    return !error;
}
