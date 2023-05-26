import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { db } from '@/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import InputText from '@/components/Input/Text'
import InputTextarea from '@/components/Input/Textarea'

const StylePostCreate = tw.form`
  flex
  flex-col
  items-center
  gap-4
  w-full 
  m-auto
  p-4
  text-white
  rounded-md
bg-purple-700
`

const StyledButton = tw.button`
  bg-purple-900
  text-white
  p-2
  rounded-md
  cursor-pointer
  hover:bg-white
  hover:text-purple-900
`

const StyledMessage = tw.p`
  mt-2
  text-sm

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
        <InputText
          className="w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body
        <InputTextarea
          className="w-full"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </label>
      <StyledButton type="submit">Create Post</StyledButton>
      {loading && (
        <StyledMessage className=" text-blue-500">Loading...</StyledMessage>
      )}
      {error && <StyledMessage className="text-red-500">{error}</StyledMessage>}
      {success && (
        <StyledMessage className="text-green-500">{success}</StyledMessage>
      )}
    </StylePostCreate>
  )
}

export default PostCreate
