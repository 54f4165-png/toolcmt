import crypto from 'node:crypto';
const key=()=>{const s=process.env.TOKEN_ENCRYPTION_KEY;if(!s||!/^[a-f0-9]{64}$/i.test(s))throw Error('TOKEN_ENCRYPTION_KEY must be 64 hex characters');return Buffer.from(s,'hex')};
export function encrypt(data){const iv=crypto.randomBytes(12),c=crypto.createCipheriv('aes-256-gcm',key(),iv);const encrypted=Buffer.concat([c.update(JSON.stringify(data)),c.final()]);return [iv.toString('hex'),c.getAuthTag().toString('hex'),encrypted.toString('hex')].join(':')}
export function decrypt(v){const [i,t,d]=v.split(':');const c=crypto.createDecipheriv('aes-256-gcm',key(),Buffer.from(i,'hex'));c.setAuthTag(Buffer.from(t,'hex'));return JSON.parse(Buffer.concat([c.update(Buffer.from(d,'hex')),c.final()]).toString())}
