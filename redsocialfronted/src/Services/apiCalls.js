const URL = 'http://localhost:4000'


export const registerUser = async (credentials) => {
    const request = await fetch(`${URL}/api/auth/register`, {
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
    const request = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    },);

    const result = await request.json();
    
    return result;

}

export const getProfile = async (token) => {
    const response = await fetch(`${URL}/api/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization":  `Bearer ${token}`
        },
  
    });

    return await response.json();
    
 

}

export const updateProfile = async (data,token) => {
    const response = await fetch(`${URL}/api/users/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
           "Authorization":  `Bearer ${token}`
        },
        body: JSON.stringify(data)
  
    });

    return await response.json()


 }

 export const createPost = async (token, data) => {
    const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}