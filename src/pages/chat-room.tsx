import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { MessageData } from "../types";
import Message from "../components/message";
import { setCurrentChat, setUser } from "../components/store/action";
import { useNavigate, useParams } from "react-router-dom";
import ChatForm from "../components/chat-form";

function ChatRoom() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { chatId } = useParams()

    const userData = useAppSelector((state) => state.userData);
    const chatData = useAppSelector((state) => state.currentChat);

    const scrollRef = useRef<HTMLDivElement>(null);

    const [quote, setQuote] = useState<MessageData | null>(null)

    useEffect(() => {
        if (chatId !== userData.currentRoom && chatId) {
            const data = {
                name: userData.name,
                currentRoom: chatId
            }
            dispatch(setUser(data))
        }
    }, [chatId, dispatch])

    useEffect(() => {
        if (userData.name === '' && userData.currentRoom !== '') {
            navigate('/')
        }
        checkRoomIsDif()
        const chatData = localStorage.getItem(userData.currentRoom);
        if (chatData) {
            dispatch(setCurrentChat(JSON.parse(chatData)));
        }
        else {
            localStorage.setItem(userData.currentRoom, JSON.stringify([]))
        }
    }, [userData])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatData])

    useEffect(() => {
        const handleStorage = () => {
            const userDataString = sessionStorage.getItem('userData');
            const userData = JSON.parse(userDataString || '{}');
            const chatData = localStorage.getItem(String(userData.currentRoom));
            if (chatData) {
                dispatch(setCurrentChat(JSON.parse(chatData)))
            }
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    function checkRoomIsDif() {
        if (chatId !== userData.currentRoom && chatId) {
            const data = {
                name: userData.name,
                currentRoom: chatId
            }
            dispatch(setUser(data))
        }
    }

    function exitFromChat() {
        const data = {
            name: userData.name,
            currentRoom: '',
        }
        dispatch(setUser(data))
        navigate("/login")
    }

    function handleMessageClick(clickedMessageData: MessageData) {
        setQuote(clickedMessageData)
    }

    function clearQuote() {
        setQuote(null)
    }

    return (
        <div className="room">
            <button className="exit-button" onClick={exitFromChat}>Выйти из чата</button>
            <h2>Вы находитесь в чате:</h2>
            <h2>{userData.currentRoom}</h2>
            <div className="chat" ref={scrollRef}>
                {chatData.map((message) => <Message key={message.id} messageData={message} userName={userData.name} onClick={handleMessageClick} />)}
            </div>
            <ChatForm quote={quote} onClearQuote={clearQuote} />
        </div>
    )
}

export default ChatRoom;
