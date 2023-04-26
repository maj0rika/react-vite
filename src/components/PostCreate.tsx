import styled from 'styled-components'
import { useState } from 'react'
import { db } from '../firebase'

import { collection, doc, setDoc } from 'firebase/firestore'

const StylePostCreate = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;

  margin: 0 auto;
  padding: 16px;

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    width: 400px;
    gap: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
`
const StyledButton = styled.button`
  background-color: #333;
  color: #fff;
  text-color: blue;
`
const StyledError = styled.p`
  color: red;
`
const StyledSuccess = styled.p`
  color: green;
`
const StyledLoading = styled.p`
  color: blue;
`

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault() // 기본 동작을 막습니다. 새로고침 방지

    if (!title || !content) {
      setError('Please enter title and content')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    const postsRef = collection(db, 'posts')
    const newPostRef = doc(postsRef) // 고유한 ID가 자동으로 생성됩니다.
    const newPostData = {
      id: newPostRef.id, // 생성된 ID를 데이터와 함께 저장합니다.
      title,
      content,
      createdAt: new Date().toISOString(),
    }
    await setDoc(newPostRef, newPostData)
      .then(() => {
        setLoading(false)
        setSuccess('Post created successfully!')
      })
      .catch(error => {
        setLoading(false)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })

    setTitle('')
    setContent('')
  }

  return (
    <StylePostCreate onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Title
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Body
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </label>
        <StyledButton type="submit">Create Post</StyledButton>
        {loading && <StyledLoading>Loading...</StyledLoading>}
        {error && <StyledError>{error}</StyledError>}
        {success && <StyledSuccess>{success}</StyledSuccess>}{' '}
      </div>
    </StylePostCreate>
  )
}

export default PostCreate
