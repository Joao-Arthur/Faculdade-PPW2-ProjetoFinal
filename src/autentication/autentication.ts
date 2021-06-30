import * as RandomString from 'crypto-random-string';
import * as NodeRSA from 'node-rsa';
import * as fs from 'fs';

function generateSalt() {
    return RandomString({ length: 256, type: 'ascii-printable' });
}

function getIterations() {
    return 1;
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
    generateSalt,
    getIterations,
    encryptRSA,
    decryptRSA,
    generatePassword
};

export default autentication;
