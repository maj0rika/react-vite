import './App.css'
import styled from 'styled-components'
import PostList from './components/PostList'
import Post from './components/Post'
import Chance from 'chance'
import { db } from './firebase'
import { collection, query, onSnapshot, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Post {
  title: string
  content: string
  createdAt: string
}

const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
`

//className loading style
const StyledLoading = styled.p`
  color: blue;
`

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error>()
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
        setPosts(postsArray)

        setLoading(false)
      } catch (e) {
        setError(e)
      }
    })

    console.log(posts)
    return () => unsubscribe()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <StyledMain>
      <PostList>
        {loading && <StyledLoading>Loading...</StyledLoading>}
        {posts.map(post => (
          <Post
            key={Chance().guid()}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            id={post.id}
          />
        ))}
      </PostList>
    </StyledMain>
  )
}

export default App
