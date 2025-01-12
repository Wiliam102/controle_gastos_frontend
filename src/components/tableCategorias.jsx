import React from "react";

const TableCategorias = ({ data, onAdd }) => {
  return (
    <div>
      <button onClick={onAdd} style={{ marginBottom: "10px", padding:"10px", borderRadius:"5px", border:"none", background:"#4A90E2", color:"white", cursor:"pointer", fontSize:"15px"}}>
        Adicionar Categoria
      </button>
      <table border="1" style={{ width: "50%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "white" }}>
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
