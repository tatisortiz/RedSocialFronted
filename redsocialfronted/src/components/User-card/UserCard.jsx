import "./UserCard.css";
export const UserCard = ({children,
    id="",
    firstName="",
    lastname="",
    email="",
    posts=""
}) => {
    return(
        isVisible &&(
                <div className="usercard-container">     
                    <h1>{"id: "+id}</h1>          
                    <h1>{"firstname: "+firstName}</h1>       
                    <h1>{"lastname: "+lastname}</h1>       
                    <h1>{"email: "+email}</h1>       
                    <h1>{"postsCount: "+posts}</h1>
                    {children}
                </div>
            )
    );
}