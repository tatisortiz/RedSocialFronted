import { useState } from "react";
import { createPost } from "../../Services/apiCalls";
import "./NewPost.css";
export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const passport = JSON.parse(localStorage.getItem("passport"));
    const token = passport?.token;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const newPost = {
        title:title,
        description:content,
      };
      if (!passport) {
        navigate("/login");
      } else {
        const result = await (createPost(token,newPost));
        console.log(result)
        if (result.success) {
          alert('Post creado exitosamente!');
          setTitle('');
          setContent('');
        } else {
          setError('No se pudo crear el post. Inténtalo de nuevo.');
        }
    
        setLoading(false);
      }
    };
  
    return (
      <div className="create-post">
        <div className="create-post-container">
          <h2>Crear Nuevo Post</h2>
          {error && <p className="error">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group-title">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group-content">
              <label htmlFor="content">Contenido</label>
              <textarea
                id="content"
                className="description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button className="button-form" type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Post'}
            </button>
          </form>
        </div>
      </div>
    );
  };