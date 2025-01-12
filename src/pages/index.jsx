import React, { useState } from "react";
import Form from "../components/form"; // Importa o componente Form
import Table from "../components/table"; // Importa o componente Table
import TableCategorias from "../components/tableCategorias";

const Home = () => {
  const [data, setData] = useState([]); // Dados da tabela
  const [showForm, setShowForm] = useState(false); // Controle de visibilidade do formulário

  // Adiciona novos dados à tabela
  const handleAddData = (newData) => {
    setData([...data, newData]);
  };

  return (
    <div>
      {/* Cabeçalho com link para categorias */}
      <header
        style={{
          padding: "10px 20px",
          backgroundColor: " #4A90E2",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Gestão de gastos</h1>
        <a
          href="#categorias"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          Categorias
        </a>
      </header>

      {/* Conteúdo principal */}
      <main style={{ padding: "20px" }}>
        {/* Botão para mostrar o formulário */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            cursor: "pointer",
            backgroundColor: "#4A90e2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize:"15px",
          }}
        >
          Adicionar
        </button>

        {/* Formulário com controle de visibilidade */}
        {showForm && (
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              width:"600px",
              height:"400px"
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                float: "right",
                cursor: "pointer",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Fechar
            </button>
            <Form onSubmit={handleAddData} />
          </div>
        )}

        {/* Tabela para exibir os dados */}
        <Table
          data={data}
          onEdit={(id) => alert(`Editar item com ID: ${id}`)}
          onDelete={(id) =>
            setData(data.filter((item) => item.id !== id))
          }
        />

        {/* Seção de Categorias */}
        <section id="categorias" style={{ marginTop: "40px" }}>
          <h2>Categorias</h2>
          <TableCategorias
          data={data}/>
        </section>
      </main>
    </div>
  );
};

export default Home;
