import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const scrypt = promisify(_scrypt);

interface IToken {
    _id: string
}

export async function generatePassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const mixedPassword = salt + '.' + hash.toString('hex');
    return mixedPassword;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, storedHash] = hashedPassword.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return storedHash === hash.toString('hex');
}

export function generateAuthToken(userId: string): string {
    const token = jwt.sign({_id: userId}, 'thisIsSecretForToken');
    return token;
}

export function decodeAuthToken(token: string): string {
    const decoded = jwt.verify(token, 'thisIsSecretForToken') as IToken;
    return decoded._id;
}