import authorization from './authorization';

describe('authorization', () => {
    it('Should generate a 256 characters long salt', () => {
        expect(authorization.generateSalt().length).toBe(256);
    });

    it('Should generate 1 iteration', () => {
        expect(authorization.getIterations()).toBe(1);
    });

    it('Should encrypt data', () => {
        const text = 'Lorem ipsum dolor sit amet';
        expect(authorization.encryptRSA(text)).not.toBe(text);
    });

    it('Should decrypt data', () => {
        const text = 'Lorem ipsum dolor sit amet';
        const encryptedText = authorization.encryptRSA(text);
        expect(authorization.decryptRSA(encryptedText)).toBe(text);
    });
});
