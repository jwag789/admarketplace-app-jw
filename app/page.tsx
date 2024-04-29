'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Battery50Icon } from '@heroicons/react/24/outline';
import { Post } from '@/app/lib/definitions';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((postsResponse) => {
        setLoading(false)
        setPosts(postsResponse)
      })
  }, [])

  return (
    <main className="flex h-dvh flex-col p-6">
      <div className="flex w-full h-dvh rounded-lg items-center justify-items-center bg-slate-200 shadow-lg p-4">
        <>
        {loading ? 
          <div className="w-full flex flex-col items-center justify-items-center">
          <Battery50Icon className="h-20 w-20" />
          <h1 className="text-2xl">Loading</h1>
          </div>
        :
        <>
        {posts &&
          <>
            <select
              
              onChange={(e) => {
                router.push(`/posts/${e.target.value}`)
              }}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
              <option selected disabled>Select a Post</option>
              {posts.map((post) =>
                <option key={post.id.toString()} value={post.id.toString()}>{post.title}</option>
              )}
            </select>
          </>
        }
        </>
        }
        </>
      </div>
    </main>
  );
}
