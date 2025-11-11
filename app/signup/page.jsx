'use client'


import { useActionState } from 'react';
import { signup } from './actions';

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="max-w-md mx-auto mt-10 p-6 bg-grey shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <div>
        <label htmlFor="username" className="block mb-1 font-medium">Username</label>
        <input
          id="username"
          name="username"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
        />
        {state?.errors?.username && (
          <p className="text-red-500 text-sm">{state.errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
        <input
          id="phone"
          name="phone"
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
        />
        {state?.errors?.phone && (
          <p className="text-red-500 text-sm">{state.errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {pending ? 'Signing up...' : 'Sign Up'}
      </button>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Already have an account?</span>
        <a href="/login" className="ml-2 text-green-600 hover:underline text-sm">
          Sign In
        </a>
      </div>
    </form>
  )
}