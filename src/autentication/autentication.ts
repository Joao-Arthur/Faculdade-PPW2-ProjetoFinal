import randomString from 'crypto-random-string';
import NodeRSA from 'node-rsa';
import fs from 'fs';

function generateSalt() {
    return randomString({ length: 256, type: 'ascii-printable' });
}

function encryptRSA(text: string) {
    const data = fs.readFileSync(`${__dirname}/Keys/public.der`);
    const publicKey = new NodeRSA(data, 'pkcs8-public-der');
    return publicKey.encrypt(text, 'base64');
}

function decryptRSA(text: string) {
    const data = fs.readFileSync(`${__dirname}/Keys/private.der`);
    const privateKey = new NodeRSA(data, 'pkcs8-private-der');
    return privateKey.decrypt(text, 'utf8');
}

function generatePassword(password: string): [string, string] {
    const salt = generateSalt();
    const hash = encryptRSA(password + salt);
    return [hash, salt];
}

const autentication = {
    decryptRSA,
    generatePassword
};

export default autentication;
