import {db} from './admin';import {decrypt} from './secure';
export async function pages(){const snap=await db().ref('connections/pages').get();return Object.entries(snap.val()||{}).map(([key,val])=>({...decrypt(val.secret),key,name:val.name}))}
