import { useState, useMemo } from 'react'
import tw from 'tailwind-styled-components'
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
  const [post, setPost] = useState({ title: '', content: '' })
  const [result, setResult] = useState({ error: '', success: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!post.title || !post.content) {
      setResult({ ...result, error: '제목과 내용을 모두 입력해주세요.' })
      return
    }

    setLoading(true)
    setResult({ error: '', success: '' })

    const postsCollectionRef = collection(db, 'posts')
    const newPostRef = doc(postsCollectionRef)

    const newPostData = {
      id: newPostRef.id,
      ...post,
      createdAt: new Date().toISOString(),
    }

    try {
      await setDoc(newPostRef, newPostData)

      setResult(prev => ({ ...prev, success: '게시글이 작성되었습니다.' }))
      setPost({ title: '', content: '' })
    } catch (error) {
      console.error('Error creating new post:', error)
      setResult(prev => ({ ...prev, error: '게시글 작성에 실패했습니다.' }))
    } finally {
      setLoading(false)
    }
  }

  // 최적화: 필요한 핸들러 함수와 컴포넌트 프롭스 캐싱
  const handleTitleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) =>
      setPost(prev => ({ ...prev, title: e.target.value })),
    [],
  )
  const handleContentChange = useMemo(
    () => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setPost(prev => ({ ...prev, content: e.target.value })),
    [],
  )

  return (
    <StylePostCreate onSubmit={handleSubmit}>
      <label className="w-full">
        제목
        <InputText
          className="w-full"
          value={post.title}
          onChange={handleTitleChange}
        />
      </label>
      <label className="w-full">
        내용
        <InputTextarea
          className="w-full"
          value={post.content}
          onChange={handleContentChange}
        />
      </label>
      <StyledButton type="submit">게시하기</StyledButton>
      {loading && (
        <StyledMessage className="text-blue-500">Loading...</StyledMessage>
      )}

      {result.error && (
        <StyledMessage className="text-red-500">{result.error}</StyledMessage>
      )}
      {result.success && (
        <StyledMessage className="text-green-500">
          {result.success}
        </StyledMessage>
      )}
    </StylePostCreate>
  )
}

export default PostCreate
