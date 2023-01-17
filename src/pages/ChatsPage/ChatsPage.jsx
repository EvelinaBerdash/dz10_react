import { useParams, Navigate } from 'react-router-dom'

import { Form } from '../../components/Form/Form'
import { MessageList } from '../../components/MessageList/MessageList'
import { ChatList } from '../../components/ChatsList/ChatList'

import { WithClasses } from '../../HOC/WithClasses'
import { useSelector } from 'react-redux'
import { selectMessage } from '../../store/messages/selectors'
import styles from './ChatsPage.module.css'

export function ChatsPage({messageDB, chats}) {
    const { chatId } = useParams()

    const MessageListWithClass = WithClasses(MessageList)
    const messagesChat = chats.find((chat) => chat?.name === chatId)
    const messages = Object.entries(messagesChat.messages).map((mes) => ({
        id: mes[0],
        text:mes[1].text,
        author: mes[1].author
    }))


    if (chatId && !messages[chatId]) {
        return <Navigate to='/chats' replace />
    }
    return (
        <>
            <h1>Welcome to chat</h1>
            <ChatList chats={chats}/>
           
            <MessageListWithClass 
                messages={chatId ? messages : []}
                classes={styles.border}
            />
             <Form />
        </>
    )
}

