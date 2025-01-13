import React, { useState } from "react";
import Form from "../components/form"; // Importa o componente Form
import Table from "../components/table"; // Importa o componente Table
import TableCategorias from "../components/tableCategorias";
import closeIcon from '../assets/x.png'

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
      <header>
        <h1>Gestão de gastos</h1>
        <a href="#categorias">Categorias</a>
      </header>

      {/* Conteúdo principal */}
      <main style={{ padding: "20px" }}>
        {/* Botão para mostrar o formulário */}
        <button
          onClick={() => setShowForm(true)}
        >
          Adicionar
        </button>

        {/* Formulário com controle de visibilidade */}
        {showForm && (
          <div
          >
            <button id="fechar"
              onClick={() => setShowForm(false)}
             
            >
             fechar
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
        <section id="categorias">
          <h2>Categorias</h2>
          <TableCategorias
          data={data}/>
        </section>
      </main>
    </div>
  );
};

export default Home;
