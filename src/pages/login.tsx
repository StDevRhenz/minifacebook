// src/pages/login.tsx
import { useRouter } from 'next/router'
import { useState } from 'react'
import supabase from '@/lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert('Login failed: ' + error.message)
    } else {
      router.push('/') // go to feed
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
