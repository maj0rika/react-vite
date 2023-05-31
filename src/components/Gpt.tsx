import { useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
const { VITE_GPT_KEY, VITE_RAPID_KEY } = import.meta.env

const ChatGptExample = () => {
  const [generatedContent, setGeneratedContent] = useState({
    id: '',
    title: '',
    content: '',
    createdAt: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const generatePost = async () => {
    setIsLoading(true) // Set isLoading to true to show the loading screen

    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a blog post generator' },
        { role: 'user', content: 'Generate a blog post for me' },
      ],
      model: 'gpt-3.5-turbo', // Specify the model to use
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
      console.log(generatedPost)
      // Separate the title and content

      const translatedContent = await translateText(generatedPost)

      const [title, ...content] = translatedContent.split('\n\n')

      setGeneratedContent({
        id: '',
        title: title.trim(),
        content: content.join('\n\n').trim(),
        createdAt: '',
      })

      await uploadPost()

      console.log(generatedContent)
    } catch (error) {
      console.error('Error generating post:', error)
    } finally {
      setIsLoading(false) // Set isLoading back to false after API communication is completed
    }
  }

  const uploadPost = async () => {
    const newPostRef = doc(collection(db, 'posts')) // 고유한 ID가 자동으로 생성됩니다.
    const newPostData = {
      id: newPostRef.id, // 생성된 ID를 데이터와 함께 저장합니다.
      title: generatedContent.title,
      content: generatedContent.content,
      createdAt: new Date().toISOString(),
    }

    try {
      await setDoc(newPostRef, newPostData)
    } catch (error) {
      console.error('Error creating new post:', error)
    }
  }

  const translateText = async (text: string) => {
    console.log('Translating text:', text)

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
    <div>
      <button onClick={generatePost}>Generate Post</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{generatedContent.title}</div>
          <div>{generatedContent.content}</div>
        </div>
      )}
    </div>
  )
}

export default ChatGptExample
