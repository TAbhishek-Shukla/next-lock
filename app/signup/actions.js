'use server';

import { SignupFormSchema } from '@/lib/definitions';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import z from 'zod';

export async function signup(_,formData) {
    console.log('signup formdata',formData);
const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early (do validation after including all codes)
   if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      errors: {
        username: tree.properties?.username?.errors?.[0],
        email: tree.properties?.email?.errors?.[0],
        phone: tree.properties?.phone?.errors?.[0],
        password: tree.properties?.password?.errors || [],
        general: tree.errors?.[0], // for form-level issues like unrecognized keys
      },
    };
  }

   const payload =validatedFields.data;
  //  console.log('signup payload',validatedFields);
   
   
   try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || 'Signup failed' };
    }
    console.log(`data returned`,data);
    
 // ✅ Create session using returned user ID
    await createSession(data._id); // or data.user.id depending on your API
    // ✅ Redirect to login on success
    redirect('/login');
  } catch (error) {
    console.error('Signup request failed:', error);
    return { error: 'Network error or server unavailable' };
  }
}