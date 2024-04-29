'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Post, Comment } from '@/app/lib/definitions';

export default function PostsPage() {
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [formComment, setFormComment] = useState<string>("");
  const [errorPage, setErrorPage] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((res) => res.json())
      .then((postResponse: Post) => {
        if (postResponse.id) {
            setPost(postResponse)
        } else {
            setErrorPage(true)
        }
    })
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${params.id}`).then((res) => res.json())
    .then((commentsResponse) => {
        setComments(commentsResponse)
    })
  }, [params]);

  const handleSubmit= (e: any) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name,
            body: formComment,
            postId: parseInt(params.id as string),
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
        setComments(
        [
            ...comments,
            { email: json.email, 
                name: json.name,
                body: json.body,
                id: json.id, 
                postId: json.postId } as Comment
        ])
     });
  }

  return (
    <>
       {post &&
        <main className="flex min-h-screen flex-col p-6">
           <div className="flex flex-col w-full min-content rounded-lg items-center justify-items-center bg-slate-200 shadow-lg p-4">
            
                <h1 className="text-4xl">{post.title}</h1>
                <h3 className="text-xl mt-4 my-1 py-4 border-y-4 border-double border-slate-400">{post.body}</h3>
            
                        {comments.map((comment, i) =>
                        <div key={i} className="w-full py-2 border-b border-slate-400 border-dashed">
                                <b>{comment.name}</b>
                                <p>{comment.body}</p>
                        </div> 
                        )}

            <form className="mt-4 w-full" onSubmit={e => { handleSubmit(e) }}>
            <label>Name:</label>
            <br />
            <input 
            name='name' 
            type='text'
            value={name}
            required
            onChange={e => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <br/>
            <label>Email:</label>
            <br />
            <input 
            name='email' 
            type='text' 
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <br />
            <label>Comment:</label>
            <br />
            <textarea
            name='comment' 
            value={formComment}
            required
            onChange={e => setFormComment(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <br/>
            <input 
            type='submit' 
            value='Post'
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
            />
            </form>
            </div> 
        </main>
        }
        {errorPage &&
            <main className="flex h-dvh flex-col p-6">
                <div className="flex w-full h-dvh rounded-lg items-center justify-items-center bg-slate-200 shadow-lg p-4">
                    <div className="w-full flex flex-col items-center justify-items-center">
                        <h4 className="text-2xl mb-5">Invalid post id: {params.id}</h4>
                        <Link href="/" className="text-xl text-blue-500 underline">Home</Link>
                    </div>
                </div>
            </main>
        }
        </>
  );
}
