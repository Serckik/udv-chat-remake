import { Route, Routes } from "react-router-dom"
import HistoryRouter from "./history-route"
import browserHistory from "../browser-history"
import MainPage from "../pages/main-page"
import ChatRoom from "../pages/chat-room"
import Load from "./load"
import { useAppDispatch } from "./hooks"
import { useEffect } from "react"
import { setUser } from "./store/action"
import NotFoundPage from "../pages/not-found-page"


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadUserData = () => {
      const userData = sessionStorage.getItem("userData");
      console.log(userData);
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
    };
    loadUserData()
  }, [dispatch])

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/login" element={<MainPage />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  )
}

export default App
