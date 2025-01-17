import React, { useState, useEffect } from "react";
import "../css/style.css";
import FormEditGasto from "./formGastoEdit"; // Certifique-se de que o caminho está correto
import editIcon from '../assets/editar.png'
import deleteIcon from '../assets/delete.png'

const TableGasto = () => {
  const [gastos, setGastos] = useState([]); // Estado para armazenar os gastos
  const [gastoEditando, setGastoEditando] = useState(null); // Estado para o gasto sendo editado

  // Função para buscar os dados da API
  const fetchGastos = async () => {
    try {
      const response = await fetch("http://localhost:8080/expense/findall");
      if (!response.ok) {
        throw new Error(`Erro ao buscar gastos: ${response.statusText}`);
      }
      const data = await response.json();
      setGastos(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
      alert("Erro ao carregar os gastos. Tente novamente mais tarde.");
    }
  };

  // Buscar os dados quando o componente for montado
  useEffect(() => {
    fetchGastos();
  }, []);

  // Função para editar um gasto
  const handleEdit = (id) => {
    const gastoParaEditar = gastos.find((gasto) => gasto.id === id);
    if (gastoParaEditar) {
      setGastoEditando(gastoParaEditar); // Atualizar o estado com o gasto selecionado
    }
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setGastoEditando(null); // Limpar o estado de edição
  };

  // Função para salvar o gasto editado
  const handleSaveEdit = (gastoAtualizado) => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === gastoAtualizado.id ? gastoAtualizado : gasto
      )
    );
    setGastoEditando(null); // Sair do modo de edição
  };

  // Função para excluir um gasto
  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja realmente excluir este gasto?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/expense/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir gasto: ${response.statusText}`);
      }
      alert("Gasto excluído com sucesso!");
      setGastos(gastos.filter((gasto) => gasto.id !== id)); // Atualizar a lista localmente
    } catch (error) {
      console.error("Erro ao excluir gasto:", error);
      alert("Erro ao excluir o gasto. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      {gastoEditando ? (
        <FormEditGasto
          initialData={gastoEditando}
          onSubmit={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>Id</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {gastos.length > 0 ? (
              gastos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}
                      style={{marginRight:"5px", background:"transparent"}}>
                        <img src={editIcon}/></button>
                    <button onClick={() => handleDelete(item.id)} style={{background:"transparent"}}>
                      <img src={deleteIcon}/>
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nenhum gasto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableGasto;
