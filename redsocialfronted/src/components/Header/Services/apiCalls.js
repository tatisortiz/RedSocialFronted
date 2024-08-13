const URL = 'http://localhost:4000'


export const registerUser = async (credentials) => {
    const request = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const result = await request.json();
    
    return result;
}


export const loginUser = async (credentials) => {
    const request = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    },);

    const result = await request.json();
    
    return result;

}