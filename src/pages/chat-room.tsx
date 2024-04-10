import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { MessageData } from "../types";
import Message from "../components/message";
import { setUser } from "../components/store/action";
import { useNavigate } from "react-router-dom";
import ChatForm from "../components/chat-form";
import styled from "@emotion/styled";
import { Button, MainBlock } from "./main-page";
import { useAuthorization } from "../components/hooks/authChecker";
import { useChatManagement } from "../components/hooks/chat";


const ChatRoomBlock = styled(MainBlock)`
    position: relative;
    height: calc(100vh - 60px);;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const H2 = styled.h2`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-bottom: 10px;
    font-size: 35px;
`;

const ExitButton = styled(Button)`
    position: absolute;
    left: 76%;
`

const Chat = styled.div`
    flex: 1;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 0; 
    }
`;

function ChatRoom() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userData = useAppSelector((state) => state.userData);
    const chatData = useAppSelector((state) => state.currentChat);

    const scrollRef = useRef<HTMLDivElement>(null);

    const [quote, setQuote] = useState<MessageData | null>(null)

    useAuthorization(userData);
    useChatManagement();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatData])

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
        <ChatRoomBlock>
            <div>
                <ExitButton className="exit-button" onClick={exitFromChat}>Выйти из чата</ExitButton>
                <H2>Вы находитесь в чате:</H2>
                <H2>{userData.currentRoom}</H2>
            </div>
            <Chat ref={scrollRef}>
                {chatData.map((message) => <Message key={message.id} messageData={message} userName={userData.name} onClick={handleMessageClick} />)}
            </Chat>
            <ChatForm quote={quote} onClearQuote={clearQuote} />
        </ChatRoomBlock>
    )
}

export default ChatRoom;
