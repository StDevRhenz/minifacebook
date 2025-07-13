import { useState } from 'react'
import supabase from '@/lib/supabaseClient'

export default function PostForm() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from('posts').insert([
      {
        content,
        user_id: user?.id,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      alert('Failed to post: ' + error.message)
    } else {
      setContent('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}
