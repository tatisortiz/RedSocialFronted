import "./Post.css";

export const Post = ({
    name="Not available",
    email="Not available",
    title="",
    content=""
}) => {
    return (
        <>
            <div className="post-container">
                <div className="post-header">
                    <span className="post-name">{name}</span>
                    <span className="post-email">{email}</span>
                </div>
                <div className="post-div">
                    <span className="post-title">{title}</span>
                    <div className="post-content">
                        {content}
                    </div>
                </div>
            </div>
        </>
    );
};