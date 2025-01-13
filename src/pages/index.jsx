import React, { useState } from "react";
import Form from "../components/formGasto"; // Importa o componente Form de gasto
import Table from "../components/table"; // Importa o componente Table
import TableCategorias from "../components/tableCategorias"; // Importa o componente TableCategorias
import CategoriaForm from "../components/formCategoria"; // Importa o componente FormCategoria
import closeIcon from '../assets/x.png';

const Home = () => {
  const [data, setData] = useState([]); // Dados da tabela
  const [showFormGasto, setShowFormGasto] = useState(false); // Controle de visibilidade do formulário de gasto
  const [showFormCategoria, setShowFormCategoria] = useState(false); // Controle de visibilidade do formulário de categoria

  // Adiciona novos dados à tabela
  const handleAddData = (newData) => {
    setData([...data, newData]);
  };

  // Função para adicionar uma categoria (ajustar conforme a lógica de envio de dados)
  const handleAddCategoria = (categoria) => {
    setData([...data, categoria]);
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
        {/* Botão para mostrar o formulário de gasto */}
        <button
          onClick={() => setShowFormGasto(true)}
          style={{ marginBottom: "20px" }}
        >
          Registrar gasto
        </button>

        {/* Formulário de Gasto */}
        {showFormGasto && (
          <div>
            <button
              id="fechar"
              onClick={() => setShowFormGasto(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={closeIcon} alt="Fechar" style={{ width: "20px", height: "20px" }} />
            </button>
            <Form onSubmit={handleAddData} />
          </div>
        )}

        
        

        {/* Formulário de Categoria */}
        {showFormCategoria && (
          <div>
            <button
              id="fechar"
              onClick={() => setShowFormCategoria(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={closeIcon} alt="Fechar" style={{ width: "20px", height: "20px" }} />
            </button>
            <CategoriaForm onSubmit={handleAddCategoria} />
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
          {/*botao para mostrar formulario de categoria */}
          <button
          onClick={() => setShowFormCategoria(true)}
          style={{ marginBottom: "20px" }}
        >
          Adicionar Categoria
        </button>
          <TableCategorias data={data} />
        </section>
      </main>
    </div>
  );
};

export default Home;
