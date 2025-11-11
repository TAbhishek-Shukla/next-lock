'use client'

import { useActionState, useEffect } from 'react'
import { login } from './actions'
import { useRouter } from 'next/navigation'
import { useSession } from '../context/SessionContext';

export default function LoginPage() {
  const { setSession } = useSession();
   const router = useRouter()
  const [state, action, pending] = useActionState(login, undefined)
  
 useEffect(() => {
     if (state?.success && state.sessionPayload) {
    setSession(state.sessionPayload); // ✅ sets full session object
    // router.refresh();                 // ✅ triggers SSR rehydration
    router.push('/')
  }
  }, [state]);
  return (
    <form action={action} className="max-w-md mx-auto mt-10 p-6 bg-grey shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {state?.errors?.password && (
          <div className="text-red-500 text-sm mb-2">
            <p>Password must:</p>
            <ul className="list-disc ml-5">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {state?.errors?.general && (
        <p className="text-red-500 text-sm mb-2">{state.errors.general}</p>
      )}

      <button
        disabled={pending}
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {pending ? 'Logging in...' : 'Log In'}
      </button>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Don't have an account?</span>
        <a href="/signup" className="ml-2 text-blue-600 hover:underline text-sm">
          Sign Up
        </a>
      </div>
    </form>
  )
}
