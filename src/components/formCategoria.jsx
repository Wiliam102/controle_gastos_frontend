import React, { useState } from "react";

const CategoriaForm = ({ onSuccess }) => {
  const [categoria, setCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoria) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/category/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoria }),
        });
        if (response.ok) {
          alert("Categoria salva com sucesso!");
          setCategoria(""); // Limpa o campo após salvar
          if (onSuccess) {
            onSuccess(); // Notifica o componente pai para atualizar a tabela
          }
        } else {
          throw new Error("Erro ao salvar categoria");
        }
      } catch (error) {
        console.error("Erro ao salvar categoria:", error);
        alert("Erro ao salvar categoria");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Por favor, preencha o campo categoria!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <label htmlFor="categoria">Nome da Categoria:</label>
      <input
        type="text"
        id="categoria"
        value={categoria}
        onChange={handleInputChange}
        placeholder="Digite o nome da categoria"
        required
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Salvando..." : "Salvar Categoria"}
      </button>
    </form>
  );
};

export default CategoriaForm;
