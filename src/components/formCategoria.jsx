import React, { useState } from 'react';

const CategoriaForm = ({ onSubmit }) => {
  const [categoria, setCategoria] = useState('');

  const handleInputChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoria) {
      onSubmit({ id: Date.now(), name: categoria }); // Adiciona a categoria com um id único
      setCategoria('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <label htmlFor="categoria">Nome da Categoria:</label>
      <input
        type="text"
        id="categoria"
        value={categoria}
        onChange={handleInputChange}
        placeholder="Digite o nome da categoria"
        required
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
      />
      <button type="submit">
        Salvar categoria
      </button>
    </form>
  );
};

export default CategoriaForm;
