import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { db } from '@/firebaseConfig'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore' // <-- not firebase/database
import InputText from '../Input/Text'
import InputTextarea from '../Input/Textarea'
import Button from '../Button'
import dayjs from 'dayjs'

const StyledPost = tw.li`
  bg-purple-700
  text-white
  rounded-md
  shadow-3xl
  p-4
  w-full
  h-full
  max-h-md
  flex
  flex-col
  items-start
  gap-4
  relative
`

function Post({
  title,
  content,
  createdAt,
  id,
}: {
  title: string
  content: string
  createdAt: string
  id: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // 수정 중 표시를 위한 상태값 추가
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedContent, setEditedContent] = useState(content)
  const [isExpanded, setIsExpanded] = useState(false)

  const deletePost = async (id: string) => {
    setIsDeleting(true)

    try {
      const postRef = doc(db, 'posts', id)
      await deleteDoc(postRef)
      setIsDeleting(false)
    } catch (error) {
      console.error('Error deleting post:', error)
      setIsDeleting(false)
    }
  }

  const updatePost = async (id: string) => {
    setIsEditing(true)

    try {
      const postRef = doc(db, 'posts', id)

      // 업데이트할 필드와 값을 객체로 전달
      const updates = {
        title: editedTitle,
        content: editedContent,
      }

      await updateDoc(postRef, updates)

      setIsEditing(false)
    } catch (error) {
      console.error('Error updating post:', error)
      setIsEditing(false)
    }
  }
  //수정 화면 모닳령식으로 변경하기.
  return (
    <StyledPost>
      {' '}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {!isEditing ? (
          <div className="flex w-full items-center justify-between gap-2">
            {title && <h1 className="text-xl font-bold">{title}</h1>}
            <div className="flex h-8 items-center gap-2">
              {isExpanded && (
                <Button onClick={() => setIsExpanded(false)}>접기</Button>
              )}
              {!isExpanded && content.length > 20 && (
                <Button onClick={() => setIsExpanded(true)}>펼치기</Button>
              )}

              <Button onClick={() => setIsEditing(true)}>
                {isEditing ? '수정 중...' : '수정'}
              </Button>
              <Button onClick={() => deletePost(id)}>
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          </div>
        ) : (
          <InputText
            className="w-full "
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
        )}
        {/* theme 사용 */}
      </div>
      {/* 수정 버튼 추가 */}
      <>
        {!isEditing ? (
          editedContent &&
          (isExpanded ? (
            editedContent.split('\n').map(line => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              )
            })
          ) : (
            <div className="flex w-full items-center justify-between gap-2">
              <p className="content">{editedContent.split('\n')[0]}</p>
            </div>
          ))
        ) : (
          <InputTextarea
            className="w-full"
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
        )}
        {createdAt && (
          <p className="text-sm font-thin ">
            작성일 : {dayjs(createdAt).format('YY년 MM월 DD일')}
          </p>
        )}
        {!isEditing ? (
          ''
        ) : (
          <div className="flex w-full justify-center gap-2">
            <Button onClick={() => updatePost(id)}>저장</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </div>
        )}
        {/* 수정 버튼 클릭 시 상태값 변경 */}
      </>
    </StyledPost>
  )
}

export default Post
