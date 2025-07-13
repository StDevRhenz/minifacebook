// src/pages/index.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import supabase from '@/lib/supabaseClient'
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  // Check user session
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      } else {
        setUser(data.session.user)
      }
    }

    getSession()
  }, [router])

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Mini Facebook Wall</h1>

      {user && (
        <>
          <PostForm />
          <hr className="my-4" />
          <PostList />
        </>
      )}

<button
  onClick={async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }}
  className="text-sm text-red-500 underline mt-4"
>
  Logout
</button>
      
    </div>
  )
}
