// app/lib/actions/logout.ts
'use server';
import { deleteSession } from '@/lib/session';
import { getSession, decrypt } from '@/lib/session'

export async function logout() {
  await deleteSession();
}


export async function getUserSession() {
  const session =await getSession()
  // console.log('session got on req of method',session);
  
  if (!session) return null

  const payload =await decrypt(session)
  
  return payload
}