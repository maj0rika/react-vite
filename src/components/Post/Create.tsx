import { useState, useMemo } from 'react'
import tw from 'tailwind-styled-components'
import { db } from '@/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import InputText from '@/components/Input/Text'
import InputTextarea from '@/components/Input/Textarea'
import { InputChangeEvent } from '@/components/Input/Text'

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
    e.preventDefault()

    if (!title || !content) {
      setError('제목과 내용을 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    const postsCollectionRef = collection(db, 'posts')
    const newPostRef = doc(postsCollectionRef)

    const newPostData = {
      id: newPostRef.id,
      title,
      content,
      createdAt: new Date().toISOString(),
    }

    try {
      await setDoc(newPostRef, newPostData)
      setSuccess('게시글이 성공적으로 작성되었습니다.')
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error creating new post:', error)
      setError('게시글 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 최적화: 필요한 핸들러 함수와 컴포넌트 프롭스 캐싱
  const handleTitleChange = useMemo(
    () => (e: InputChangeEvent) => setTitle(e.target.value),
    [],
  )
  const handleContentChange = useMemo(
    () => (e: InputChangeEvent) => setContent(e.target.value),
    [],
  )

  return (
    <StylePostCreate onSubmit={handleSubmit}>
      <label className="w-full">
        제목
        <InputText
          className="w-full"
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <label className="w-full">
        내용
        <InputTextarea
          className="w-full"
          value={content}
          onChange={handleContentChange}
        />
      </label>
      <StyledButton type="submit">게시하기</StyledButton>
      {loading && (
        <StyledMessage className="text-blue-500">Loading...</StyledMessage>
      )}
      {error && <StyledMessage className="text-red-500">{error}</StyledMessage>}
      {success && (
        <StyledMessage className="text-green-500">{success}</StyledMessage>
      )}
    </StylePostCreate>
  )
}

export default PostCreate
