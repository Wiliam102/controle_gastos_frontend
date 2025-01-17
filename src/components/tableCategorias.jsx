import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const TableCategorias = forwardRef((props, ref) => {
  const [data, setData] = useState([]);

  // Função para buscar as categorias da API
  const fetchCategorias = async () => {
    try {
      const response = await fetch("http://localhost:8080/category/findall");
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Expondo a função fetchCategorias para o componente pai
  useImperativeHandle(ref, () => ({
    fetchCategorias,
  }));

  useEffect(() => {
    fetchCategorias(); // Busca inicial ao montar o componente
  }, []);

  return (
    <div>
      <table className="tabela tabelaCategorias" style={{width:"50%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TableCategorias;

