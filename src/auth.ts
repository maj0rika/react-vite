// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   setPersistence,
//   browserSessionPersistence,
// } from 'firebase/auth'
// import { IMyInfo } from '@/store/my'

// import { auth } from '@/firebaseConfig'

// export const register = async (email: string, password: string) => {
//   console.log('register')
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     )
//     const user = userCredential.user
//     return user
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const login = async (email: string, password: string) => {
//   console.log('login')
//   try {
//     await setPersistence(auth, browserSessionPersistence).then(async () => {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       )

//       const user = userCredential.user
//       return user
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const logout = async () => {
//   console.log('logout')
//   try {
//     await signOut(auth)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const onAuthChange = async (callback: any) => {
//   console.log('onAuthChange')
//   onAuthStateChanged(auth, async user => {
//     console.log('onAuthStateChanged', user)
//     await callback(user)
//   })
// }

// export const getUser = () => {
//   console.log('getUser')
//   return auth.currentUser
// }

// export const checkUser: any = async () => {
//   console.log('checkUser')
//   const user = getUser()
//   if (user) {
//     const myInfo: IMyInfo = {
//       // uid: user.uid,
//       email: user.email || '',
//     }
//     return myInfo
//   } else {
//     await onAuthChange(async (user: any) => {
//       if (user) {
//         const myInfo: IMyInfo = {
//           // uid: user.uid,
//           email: user.email || '',
//         }

//         return myInfo
//       } else {
//         return null
//       }
//     })

//     return null
//   }
// }

// export const getUid = async () => {
//   console.log('getUid')
//   const user = await getUser()
//   if (user) {
//     return user.uid
//   }
//   return null
// }

// export const getEmail = async () => {
//   console.log('getEmail')
//   const user = await getUser()
//   if (user) {
//     return user.email
//   }
//   return null
// }
