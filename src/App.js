import { Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { nanoid } from 'nanoid'

import { defaultContext, ThemeContext } from './utils/ThemeContext';
import { store, persistor } from './store'
import { onValue } from 'firebase/database'

import { Header } from "./components/Header/Header"
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutWithConnect } from './pages/AboutPage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage'
import { ChatList } from './components/ChatsList/ChatList'
import { Articles } from './pages/Articles'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { firebaseAuth, messagesRef } from './services/firebase'
import { auth } from './store/profile/actions'
import { PrivateRoute } from './utils/PrivateRoute'
import { PublicRoute } from './utils/PublicRoute'

export function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState(defaultContext.theme)

  const [messageDB, setMessageDB] = useState({})
  const [chats, setChats] = useState([])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const unsuscribe = firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(auth(true))
      } else {
        dispatch(auth(false))
      }
    })
    return unsuscribe
  }, [])

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      console.log('snapshot', data)

      const newChats = Object.enteries(data).map((item) => ({
        name:item[0],
        message: item[1].messageList
      }))
      console.log(newChats)

      setMessageDB(data)
      setChats(newChats)
    })
  }, [])
  return (
    <>
      {/* <Header /> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeContext.Provider value={{
            theme,
            toggleTheme
          }}>
            <Routes>
              <Route path='/' element={<Header />}>
                <Route index element={<MainPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/about' element={<AboutWithConnect />} />
                {/* <Route path='chats'>
                  <Route index element={<ChatList />} />
                  <Route
                    path=':chatId'
                    element={<ChatsPage />}
                  />
                </Route> */}
                <Route path='chats'>
                  <Route index element={<PrivateRoute />} />
                  <Route
                    index
                    element={<ChatList chats={chats} messageDB={messageDB}/>}
                  />
                  <Route
                    path=':chatId'
                    element={<ChatsPage chats={chats} messageDB={messageDB}/>}
                  />
                </Route>
                <Route path='articles' element={<Articles />} />
                <Route path='signin' element={<PublicRoute component={<SignIn />} />} />
                <Route path='signup' element={<SignUp />} />
              </Route>
              <Route path='*' element={<h2>404 Page not FOUND</h2>} />
            </Routes>
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App