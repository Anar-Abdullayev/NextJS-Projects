'use client'

import { useRouter } from "next/navigation"

export default function LoginPage(){
    const router=useRouter();

    const handleLogin=()=>{
        document.cookie='access=true; path=/';
        router.push('/profile');
    }

    return (
        <div style={{padding:20}}>
            <h1>Login</h1>
            <button className="rounded bg-blue-200 px-3 py-1 cursor-pointer" onClick={handleLogin}>Sign In</button>
        </div>
    )
}