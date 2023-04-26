import styled from 'styled-components'
import { useState } from 'react'
import { db } from '../firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore' // <-- not firebase/database

// Post 컴포넌트 스타일링
const StyledPost = styled.li`
  border: 1px solid #ccc;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 auto;
  position: relative;
  h2 {
    font-size: 1.5rem;
  }
  p {
    margin: 0;

    &.createdAt {
      font-size: 0.75rem;
      margin: 16px 0;
    }

    &.content {
      font-size: 1rem;
    }
  }
  strong {
    color: #333;
  }
  time {
    color: #999;
  }
`

const StyledButton = styled.button`
  border: 1px solid #ccc;
  display: flex;
`

const StyledPostEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;

  margin: 0 auto;
  padding: 16px;
`

function Post({ title, content, createdAt, id }: { title: string; content: string; createdAt: string; id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // 수정 중 표시를 위한 상태값 추가
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedContent, setEditedContent] = useState(content)

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

  return (
    <StyledPost>
      <div style={{ display: 'flex', gap: '5px', position: 'absolute', top: '10px', right: '10px' }}>
        <StyledButton onClick={() => deletePost(id)}>{isDeleting ? '삭제 중...' : '삭제'}</StyledButton>
        {/* <button onClick={() => setIsEditing(true)}>수정</button> */}
        <StyledButton onClick={() => setIsEditing(true)}>{isEditing ? '수정 중...' : '수정'}</StyledButton>
      </div>
      {/* 수정 버튼 추가 */}
      {isEditing ? (
        <StyledPostEdit>
          <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
          <textarea value={editedContent} onChange={e => setEditedContent(e.target.value)} />
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => updatePost(id)}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </StyledPostEdit>
      ) : (
        <>
          {title && <h2>{title}</h2>}
          {content && <p className="content">{content}</p>}
          {createdAt && (
            <p className="createdAt">
              <strong>Created at:</strong> <time>{createdAt}</time>
            </p>
          )}
          {/* 수정 버튼 클릭 시 상태값 변경 */}
        </>
      )}
    </StyledPost>
  )
}

export default Post
