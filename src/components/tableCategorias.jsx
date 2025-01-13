import React from "react";

const TableCategorias = ({ data, onAdd }) => {
  return (
    <div>
      <button onClick={onAdd}>
        Adicionar Categoria
      </button>
      <table className="tabela">
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
};

export default TableCategorias;
