'use client';
import { useRouter } from 'next/navigation';
import { logout } from './actions';
import { useSession } from '../context/SessionContext';
import { useEffect } from 'react';

// export default function LogoutButton() {
//    const { setSession } = useSession();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout(); // ✅ triggers session deletion + redirect
//      setSession(null);      // ✅ clear client session
//     router.refresh();  
//     router.push('/login');    // ✅ re-sync server components
//   };

//   return (
//     <button onClick={handleLogout} className="hover:underline text-red-400">
//       Logout
//     </button>
//   );
// }

export default function LogoutPage() {
  const { setSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logout();         // ✅ clears cookie
      setSession(null);       // ✅ clears client context
      router.refresh();       // ✅ rehydrates layout
      router.push('/login');  // ✅ redirect to login
    };

    performLogout();
  }, []);

  return <p>Logging out...</p>; // Optional loading message
}