import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/Services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientID = chat?.members.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientID) return null;
            setError(null);
            const response = await getRequest(`${baseUrl}/users/find/${recipientID}`);

            if (response.error) {
                return setError(error);
            }

            setRecipientUser(response);
        }
        getUser();
    }, [recipientID]);

    return { recipientUser }
};