import { useState } from "react";


export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const newPost = {
        title,
        content,
      };
  
      const result = await (CreatePost);
  
      if (result) {
        // Maneja el éxito (por ejemplo, redirige o limpia el formulario)
        alert('Post creado exitosamente!');
        setTitle('');
        setContent('');
      } else {
        // Maneja el error
        setError('No se pudo crear el post. Inténtalo de nuevo.');
      }
  
      setLoading(false);
    };
  
    return (
      <div className="create-post">
        <h2>Crear Nuevo Post</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Post'}
          </button>
        </form>
      </div>
    );
  };