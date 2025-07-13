import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Check your email for confirmation link!')
      router.push('/login')
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
