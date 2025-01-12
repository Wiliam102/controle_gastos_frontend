import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    valor: "",
    data: "",
    descricao: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar se todos os campos estão preenchidos
    if (!formData.valor || !formData.data || !formData.descricao || !formData.categoria) {
      alert("Por favor! Preencha todos os campos");
      return;
    }
    onSubmit({ id: Date.now(), ...formData });
    // Resetar o formulário
    setFormData({ valor: "", data: "", descricao: "", categoria: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Data:
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Categoria:
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="">Selecione</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="outros">Outros</option>
          </select>
        </label>
      </div>
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        Enviar
      </button>
    </form>
  );
};

export default Form;
