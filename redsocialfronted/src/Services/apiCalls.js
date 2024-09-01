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
    const response = await fetch(`${URL}/api/posts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}
export const getAllPosts = async (token) => {
    try {
        const response = await fetch(`${URL}/api/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json()
    } catch (error) {
        console.error("Error getting posts:", error);
        throw error;
    }
}

export const deletePostById = async (token, id) => {
    try {
        const response = await fetch(`${URL}/api/posts/${id}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

  export const getMyPosts = async (token) => {
    try {
        const response = await fetch(`${URL}/api/posts/own`, {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        return await response.json()
    } catch (error) {
        console.error("Error getting my posts:", error);
        throw error;
    }
}

export const updatePosts = async (id, data, token) => {
    try {
        const response = await fetch(`${URL}/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        return await response.json()
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}
export const likePostById = async (id, token) => {
    try {
        
        const response = await fetch(`${URL}/api/posts/like/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return await response.json()
    } catch (error) {
        console.error("Error updating post likes:", error);
        throw error;
    }
}
export const getPostById = async (id,token) => {
    try {
        const response = await fetch(`${URL}/api/posts/${id}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting post by id:", error);
        throw error;
    }
}
export const getAllUsers = async (token) => {
    try {
        const response = await fetch(`${URL}/api/users`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting post by id:", error);
        throw error;
    }
}
export const getPostByUserId = async (id, token) => {
    try {
        const response = await fetch(`${URL}/api/posts/user/${id}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting post by id:", error);
        throw error;
    }
}
