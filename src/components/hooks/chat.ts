import { useEffect } from 'react';
import { MessageData, UserData } from '../../types';
import { useAppDispatch, useAppSelector } from '.';
import { setCurrentChat, setUser } from '../store/action';
import { useParams } from 'react-router-dom';

type SendMessageHookResult = {
    sendMessage: (message: string, image: string, quote: MessageData | null) => void;
};

export function useSendMessage(): SendMessageHookResult {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userData);
    const chatData = useAppSelector((state) => state.currentChat);

    function sendMessage(message: string, image: string, quote: MessageData | null) {
        if (!message && !image) {
            return;
        }

        const data = {
            id: chatData.length + 1,
            sender: userData.name,
            message: message,
            image: image,
            quote: quote,
        };

        const newChatData = [...chatData, data];
        dispatch(setCurrentChat(newChatData));
        localStorage.setItem(String(userData.currentRoom), JSON.stringify(newChatData));
    }

    return { sendMessage };
}

export function useChatManagement(): void {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userData);
    const { chatId } = useParams();

    function getSessionStorageData(): UserData {
        const userDataString = sessionStorage.getItem('userData');
        return JSON.parse(userDataString || '{}') as UserData;
    }

    useEffect(() => {
        function handleStorage() {
            const sessionUserData = getSessionStorageData()
            const chatData = localStorage.getItem(String(sessionUserData.currentRoom));
            if (chatData) {
                dispatch(setCurrentChat(JSON.parse(chatData)));
            }
        }

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        checkRoomIsDif();
        const chatData = localStorage.getItem(userData.currentRoom);

        if (chatData) {
            dispatch(setCurrentChat(JSON.parse(chatData)));
        } else {
            localStorage.setItem(userData.currentRoom, JSON.stringify([]));
            dispatch(setCurrentChat([]));
        }
    }, [chatId, userData, dispatch]);

    function checkRoomIsDif() {
        const sessionUserData = getSessionStorageData()
        if (chatId !== sessionUserData.currentRoom && chatId) {
            console.log(chatId)
            const data = {
                name: sessionUserData.name,
                currentRoom: chatId,
            };
            dispatch(setUser(data));
            sessionStorage.setItem('userData', JSON.stringify(data));
        }
    }
}
