import { AUTHOR } from "../../constants";
import { ADD_CHAT, DELETE_CHAT, ADD_MESSAGE } from "./actions";

const initialState = {
    default: [
        {
            author: 'user',
            text: 'one text'
        },
        {
            author: 'user',
            text: 'two text'
        }
    ]
}

export const messagesReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_CHAT:
            return {
                ...state,
                [payload]: []
            }
        case DELETE_CHAT:
            const chats = { ...state}
            delete chats[payload]
            return chats

        case ADD_MESSAGE: 
            return {
                ...state,
                [payload.chatName]: [
                    ...state[payload.chatName],
                    {
                        author: payload.text.author,
                        text: payload.text.text
                    }
                ],
            }
        default:
            return state;
    }
}