import { MessageData } from "../types"
import styled from "@emotion/styled";

interface MessageBlockProps {
    isSender: boolean;
    isQuote: boolean;
}

const MessageBlock = styled.div<MessageBlockProps>(props => ({
    cursor: 'pointer',
    wordWrap: 'break-word',
    width: 'fit-content',
    maxWidth: '50%',
    background: props.isSender ? 'rgb(155, 89, 163)' : '#EAEAEA',
    borderRadius: '6px',
    margin: '10px 0',
    padding: '5px 5px 5px 5px',
    fontSize: '18px',
    color: props.isSender ? 'white' : '',
    marginLeft: props.isSender ? 'auto' : '',

    ...(props.isQuote && { background: '#C9F76F', minWidth: '100%', boxShadow: '-0 10px 20px -2px gray', marginBottom: '20px !important', color: 'black' }),
}));

const Name = styled.p`
    font-weight: bold;
`

type MessageProps = {
    messageData: MessageData;
    userName: string;
    onClick?: (clickedMessageData: MessageData) => void;
}

function Message({ messageData, userName, onClick }: MessageProps) {
    const isSender = userName === messageData.sender
    const isQuote = userName === 'quoted'
    return (
        <>
            <MessageBlock isSender={isSender} isQuote={isQuote} onClick={() => { onClick && onClick(messageData) }}>
                {messageData.quote && <Message messageData={messageData.quote} userName={'quoted'} />}
                <Name>{messageData.sender}</Name>
                <p>{messageData.message}</p>
                {messageData.image && <img width={300} height={300} src={messageData.image}></img>}
            </MessageBlock>
        </>
    )
}

export default Message