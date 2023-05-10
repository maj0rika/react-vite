import styled from 'styled-components'
import { useState } from 'react'
import { db } from '@/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'

const StylePostCreate = styled.form`
  ${({ theme }) => theme.commons.flexColumn};

  align-items: center;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;

  label {
    ${({ theme }) => theme.commons.flexColumn};

    gap: 8px;
  }

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    height: 150px;
  }
`

const StyledButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`

const StyledMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;

  &.error {
    color: red;
  }

  &.success {
    color: green;
  }

  &.loading {
    color: blue;
  }
`

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async e => {
    e.preventDefault() // 기본 동작을 막습니다. 새로고침 방지

    if (!title || !content) {
      setError('Please enter title and content')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    const newPostRef = doc(collection(db, 'posts')) // 고유한 ID가 자동으로 생성됩니다.
    const newPostData = {
      id: newPostRef.id, // 생성된 ID를 데이터와 함께 저장합니다.
      title,
      content,
      createdAt: new Date().toISOString(),
    }

    try {
      await setDoc(newPostRef, newPostData)
      setSuccess('Post created successfully!')
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error creating new post:', error)
      setError('Error creating new post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StylePostCreate onSubmit={handleSubmit}>
      <label>
        Title
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Body
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <StyledButton type="submit">Create Post</StyledButton>
      {loading && <StyledMessage className="loading">Loading...</StyledMessage>}
      {error && <StyledMessage className="error">{error}</StyledMessage>}
      {success && <StyledMessage className="success">{success}</StyledMessage>}
    </StylePostCreate>
  )
}

export default PostCreate
