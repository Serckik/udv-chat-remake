import { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import Message from "./message"
import { MessageData } from "../types"
import { EmojiClickData } from "emoji-picker-react";
import { useAppSelector } from "./hooks";
import Emoji from "./emoji";
import { Input, Svg } from "../pages/main-page";
import styled from "@emotion/styled";
import { useSendMessage } from "./hooks/chat";

const Form = styled.form`
    position: relative;
`

const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FormInput = styled(Input)`
    margin-top: 10px;
    width: 90%;
`

const FileInput = styled(Input)`
    width: fit-content;
    height: fit-content;
`

const Error = styled.p`
    color: red;
`

const Quote = styled.div(() => ({
    backgroundColor: 'white',
    border: '1px solid black',
    overflow: 'auto',
    maxHeight: '30vh',
    '& img': {
        maxWidth: '100%',
        maxHeight: '200px',
    },
    '& div': {
        margin: '0',
        maxWidth: '100%',
    }
}))


type ChatFormProps = {
    quote: MessageData | null
    onClearQuote: () => void
}

function ChatForm({ quote, onClearQuote }: ChatFormProps) {
    const { sendMessage } = useSendMessage();

    const userData = useAppSelector((state) => state.userData);

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [isEmojiSelectVisible, setIsEmojiSelectVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleMessage(evt: ChangeEvent<HTMLInputElement>) {
        setMessage(evt.target.value)
    }

    function handleSubmit(evt: SyntheticEvent) {
        evt.preventDefault();
        if (!message && !image) { return }
        sendMessage(message, image, quote)
        setMessage('')
        setImage('')
        setErrorMessage('')
        onClearQuote()
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function handleEmoji(evt: EmojiClickData) {
        setMessage(prevMessage => prevMessage + evt.emoji)
    }

    function handleImage(evt: ChangeEvent<HTMLInputElement>) {
        if (evt.target.files && evt.target.files.length > 0) {
            const file = evt.target.files[0];
            const type = file.type.split('/')[0]
            if (type !== 'image') {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setErrorMessage('Файл может быть только картинкой')
                return
            }
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result && typeof reader.result === 'string') {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setErrorMessage('')
        }
    }

    return (
        <div>
            {quote && <Quote>
                <Message messageData={quote} userName={userData.name}></Message>
            </Quote>}
            <Form id="chat-room-form" onSubmit={handleSubmit}>
                <FormHeader>
                    <FormInput type="text" placeholder="написать сообщение" value={message} onChange={handleMessage} />
                    <button type="button" onClick={() => { setIsEmojiSelectVisible(!isEmojiSelectVisible) }}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z"></path>
                        </Svg>
                    </button>
                    <button type="submit">
                        <Svg className="chat-submit" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.179175 2C-0.320825 0 0.679175 -0.5 2.17917 0.5L22.6792 11C29 14 29 14 22.6787 17L2.17917 27.5C0.178743 28.5 -0.317676 27.9795 0.178993 26L2.17899 16L15.6792 14L2.17917 12L0.179175 2Z" fill="#F89C1D" />
                        </Svg>
                    </button>
                </FormHeader>
                <div>
                    <FileInput className="media-input" type="file" accept="image/*" ref={fileInputRef} onChange={handleImage} />
                    <Emoji onClick={handleEmoji} show={isEmojiSelectVisible} />
                </div>
            </Form>
            <Error>{errorMessage}</Error>
            {image && <div><img className="preview-image" width={200} height={200} src={image}></img></div>}
        </div>
    )
}

export default ChatForm
