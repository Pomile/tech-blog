import { createHmac } from 'crypto';
const hashSecret = process.env.HASH_SECRET

export function genHash(email) {
    console.log(hashSecret)
    const hmac = createHmac('sha256', hashSecret);
    hmac.update(email + Math.floor(Math.random() * 10000));
    return hmac.digest('hex')
}