import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext"
import { baseUrl, getRequest } from "../utils/Services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notification } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if (response.error) {
                return console.log("Error getting messages...", error);
            }

            const lastMessage = response[response?.length - 1];

            setLatestMessage(lastMessage);
        };

        getMessages();
    }, [newMessage, notification])
    return { latestMessage };
};