import { useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import InputText from '@/components/Input/Text'
import Button from '@/components/Button'

const { VITE_GPT_KEY, VITE_RAPID_KEY } = import.meta.env

const ChatGptExample = () => {
  const [generatedContent, setGeneratedContent] = useState({
    id: '',
    title: '',
    content: '',
    createdAt: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [systemCommand, setSystemCommand] = useState('넌 게시글 생성기야')
  const [userCommand, setUserCommand] = useState('게시글 생성해줘')

  const generatePost = async () => {
    setIsLoading(true) // Set isLoading to true to show the loading screen

    const requestBody = {
      messages: [
        { role: 'system', content: systemCommand },
        { role: 'user', content: userCommand },
      ],
      model: 'gpt-3.5-turbo',
    }

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: VITE_GPT_KEY, // Replace with your actual API key
          },
          body: JSON.stringify(requestBody),
        },
      )

      const data = await response.json()
      const generatedPost = data.choices[0].message.content

      let [title, ...content] = generatedPost.split('\n\n')

      if (detectLanguage(title) === 'english') {
        let translatedContent = await translateText(generatedPost)

        //  [title, ...content] = translatedContent.split('\n\n')
        title = translatedContent.split('\n\n')[0]
        content = translatedContent.split('\n\n').slice(1)
      }

      setGeneratedContent((prevState: any) => {
        return {
          ...prevState,
          title,
          content: content.join('\n\n'),
        }
      })

      const newPostRef = doc(collection(db, 'posts')) // 고유한 ID가 자동으로 생성됩니다.
      const newPostData = {
        id: newPostRef.id, // 생성된 ID를 데이터와 함께 저장합니다.
        title,
        content: content.join('\n\n'),
        createdAt: new Date().toISOString(),
      }

      try {
        await setDoc(newPostRef, newPostData)
      } catch (error) {
        console.error('Error creating new post:', error)
      }
    } catch (error) {
      console.error('Error generating post:', error)
    } finally {
      setIsLoading(false) // Set isLoading back to false after API communication is completed
    }
  }

  const detectLanguage = (str: string) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    const english = /[A-Za-z]/

    if (korean.test(str)) {
      return 'korean'
    } else if (english.test(str)) {
      return 'english'
    } else {
      return 'unknown'
    }
  }

  // useEffect(() => {
  //   if (generatedContent.title && generatedContent.content) {
  //     uploadPost()
  //   }
  // }, [generatedContent])

  // const uploadPost = async () => {
  //   const newPostRef = doc(collection(db, 'posts')) // 고유한 ID가 자동으로 생성됩니다.
  //   const newPostData = {
  //     id: newPostRef.id, // 생성된 ID를 데이터와 함께 저장합니다.
  //     title: generatedContent.title,
  //     content: generatedContent.content,
  //     createdAt: new Date().toISOString(),
  //   }

  //   try {
  //     await setDoc(newPostRef, newPostData)
  //   } catch (error) {
  //     console.error('Error creating new post:', error)
  //   }
  // }

  const translateText = async (text: string) => {
    const requestBody = {
      text,
      target: 'KO',
      source: 'EN',
    }

    try {
      const response = await fetch(
        'https://deepl-translator.p.rapidapi.com/translate',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': VITE_RAPID_KEY, // Replace with your actual API key
            'X-RapidAPI-Host': 'deepl-translator.p.rapidapi.com',
          },
          body: JSON.stringify(requestBody),
        },
      )

      const data = await response.json()

      return data.text
    } catch (error) {
      console.error('Error translating text:', error)
      return text // Return the original text in case of an error
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      {/* <button onClick={generatePost}>Generate Post</button> */}
      <Button onClick={generatePost}>Generate Post</Button>
      <div className="flex flex-col gap-2">
        <div>인공지능의 역할</div>
        <InputText
          className="w-full"
          value={systemCommand}
          onChange={e => setSystemCommand(e.target.value)}
        />
        <div>나의 명령</div>
        <InputText
          className="w-full"
          value={userCommand}
          onChange={e => setUserCommand(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div>Chat GPT가 열심히 작업중입니다...</div>
      ) : (
        <div>
          <div>{generatedContent.title}</div>
          <div>
            {generatedContent.content.split('\n').map((line, i) => {
              return (
                <span key={i}>
                  {line}
                  <br />
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatGptExample
