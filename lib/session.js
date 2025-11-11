import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

import { cookies } from 'next/headers'
 


export async function encrypt(payload) {
  return new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('7d')
  .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    if (!session || typeof session !== 'string') {
      throw new Error('Invalid session token')
    }

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error) {
    console.error('Failed to verify session:', error)
    return null
  }
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}
 
export async function createSession(payload) {
  const { id, username, isAdmin } = payload     //left the token that i created by mistake
  // console.log('user id got at sessionfile',payload);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({id, username, isAdmin, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  console.log('del metod called');
  
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  return session?.value || null
}