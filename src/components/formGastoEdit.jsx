import React, { useState, useEffect } from "react";
import "../css/style.css";

const FormEditGasto = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    valor: "",
    data: "",
    descricao: "",
    categoria: "",
  });
  const [categorias, setCategorias] = useState([]);

  // Preencher formulário com os dados iniciais
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        valor: initialData.amount || "", // Ajuste caso o backend use "amount"
        data: initialData.date || "",
        descricao: initialData.description || "",
        categoria: initialData.categoria?.id || "",
      });
    }
  }, [initialData]);

  // Buscar categorias do backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/category/findall");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!formData.valor || !formData.data || !formData.descricao || !formData.categoria) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const categoriaSelecionada = categorias.find(
      (categoria) => categoria.id.toString() === formData.categoria
    );

    if (!categoriaSelecionada) {
      alert("Categoria inválida.");
      return;
    }

    const gastoParaAtualizar = {
      id: formData.id,
      amount: formData.valor,
      date: formData.data,
      description: formData.descricao,
      category: categoriaSelecionada,
    };

    try {
      const response = await fetch(`http://localhost:8080/expense/update/${gastoParaAtualizar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gastoParaAtualizar),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar o gasto: ${response.statusText}`);
      }

      alert("Gasto atualizado com sucesso!");
      onSubmit(gastoParaAtualizar); // Notificar o componente pai sobre a atualização
    } catch (error) {
      console.error("Erro ao atualizar gasto:", error);
      alert("Erro ao atualizar o gasto. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Editar Gasto</h2>
      <div>
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="Digite o valor"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Data:
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Descrição:
          <textarea
            name="descricao"
            rows={5}
            cols={40}
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Digite a descrição"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Categoria:
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Cancelar
      </button>
    </form>
  );
};

export default FormEditGasto;
