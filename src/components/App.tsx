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
import { Global, css } from '@emotion/react';

const globalStyles = css`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-weight: normal;
    font-style: normal;
    }

    button {
    background-color: white;
    border: none;
    cursor: pointer;
    }

    body {
    background-color: #F5F5F5;
    padding-top: 40px;
    }
`;


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadUserData = () => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
    };
    loadUserData()
  }, [dispatch])

  return (
    <>
      <Global styles={globalStyles} />
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path="/" element={<Load />} />
          <Route path="/login" element={<MainPage />} />
          <Route path="/chat/:chatId" element={<ChatRoom />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </>
  )
}

export default App
