'use server'

import { z } from 'zod'
import { LoginFormSchema } from '@/lib/definitions'
import { createSession } from '@/lib/session';

export async function login(_, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      errors: {
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors || [],
        general: tree.errors?.[0],
      },
    };
  }

  const payload = validatedFields.data;
// console.log('payload is ',payload);
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, error: data.error || 'Login failed' };
    }
      const sessionPayload = {
      id: data?._id,
      username: data?.username,
      isAdmin:data?.isAdmin,
      token:data?.token
    };
    await createSession(sessionPayload);
    // console.log('logindata',data);
    
    return { success: true, sessionPayload};
  } catch (error) {
    console.error('Login request failed:', error);
    return { success: false, error: 'Network error or server unavailable' };
  }
}