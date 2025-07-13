import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-3 rounded shadow-sm">
          <p>{post.content}</p>
          <small className="text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}
