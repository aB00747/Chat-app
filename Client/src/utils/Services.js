export const baseUrl = "http://localhost:5000/api"

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    if (!response.ok) {
        let errorMessage
        if (data?.errorMessage) {
            errorMessage = data.errorMessage;
        } else {
            errorMessage = data;
        }

        return { error: true, errorMessage }
    }

    return data;
};

export const getRequest = async (url) => {

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        let errorMessage = "An error occured...";

        if (data?.errorMessage) {
            errorMessage = data.errorMessage;
        }

        return { error: true, errorMessage };
    }
    return data;

}