import PostList from './List'
import PostCard from './Card'
import tw from 'tailwind-styled-components'
import Chance from 'chance'
import { db } from '@/firebaseConfig'
import {
  collection,
  query,
  onSnapshot,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
}

const StyledLoading = tw.p`
  color-blue-500
`

function Post() {
  const [posts, setPosts] = useState<Post[]>([])
  // const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'posts'))

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      try {
        const postsArray: Post[] = []
        querySnapshot.forEach((doc: DocumentSnapshot) => {
          const data = doc.data()
          console.log(data)
          if (data) {
            postsArray.push(data as Post)
          }
        })

        postsArray.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })

        setPosts(postsArray)

        setLoading(false)
      } catch (e) {
        //ts
      }
    })

    console.log(posts)
    return () => unsubscribe()
  }, [])

  // if (error) {
  //   return <div>Error: {error.message}</div>
  // }

  return (
    <PostList>
      {loading && <StyledLoading>Loading...</StyledLoading>}

      {posts.map(post => (
        <PostCard
          key={Chance().guid()}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          id={post.id}
        />
      ))}
    </PostList>
  )
}

export default Post
