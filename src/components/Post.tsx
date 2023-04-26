import styled from 'styled-components'
import { useState } from 'react'
import { db } from '../firebase'
import { deleteDoc, doc } from 'firebase/firestore' // <-- not firebase/database

// Post 컴포넌트 스타일링
const StyledPost = styled.li`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    margin: 0;
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
  position: absolute;
  top: 10px;
  right: 10px;
`

function Post({ title, content, createdAt, id }: { title: string; content: string; createdAt: string; id: string }) {
  const [isDeleting, setIsDeleting] = useState(false) // 삭제 중 표시를 위한 상태값 추가

  const deletePost = async (id: string) => {
    setIsDeleting(true) // 삭제 시작 시 상태값 변경

    try {
      // 삭제할 문서의 참조 생성
      const postRef = doc(db, 'posts', id)

      // 삭제 수행
      await deleteDoc(postRef)

      // 삭제 완료 시 상태값 변경
      setIsDeleting(false)
    } catch (error) {
      console.error('Error deleting post:', error)
      setIsDeleting(false)
    }
  }
  return (
    <StyledPost>
      {/* 삭제버튼 오른쪽 위에 생성 */}
      <StyledButton onClick={() => deletePost(id)}>{isDeleting ? '삭제 중...' : '삭제'}</StyledButton>
      {/* props값이 있는지 없는지 검사 */}
      {title && <h2>{title}</h2>}
      {content && <p>{content}</p>}
      {createdAt && (
        <p>
          <strong>Created at:</strong> <time>{createdAt}</time>
        </p>
      )}
    </StyledPost>
  )
}

export default Post
