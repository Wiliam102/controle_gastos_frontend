import React, { useState, useRef } from "react";
import Form from "../components/formGasto"; // Formulário de gastos
import TableCategorias from "../components/tableCategorias"; // Tabela de categorias
import TableGasto from "../components/tableGasto.jsx"; // Tabela de gastos
import CategoriaForm from "../components/formCategoria"; // Formulário de categorias
import closeIcon from "../assets/x.png";

const Home = () => {
  const [showFormGasto, setShowFormGasto] = useState(false); // Controle do formulário de gasto
  const [showFormCategoria, setShowFormCategoria] = useState(false); // Controle do formulário de categoria
  const tableCategoriasRef = useRef(null); // Referência para o componente TableCategorias

  // Atualiza a tabela de categorias ao salvar uma nova categoria
  const handleCategoriaSuccess = () => {
    if (tableCategoriasRef.current) {
      tableCategoriasRef.current.fetchCategorias(); // Atualiza a tabela chamando a função do componente
    }
  };

  return (
    <div>
      <header>
        <h1>Gestão de Gastos</h1>
        <a href="#categorias">Categorias</a>
      </header>

      <main>
        {/* Botão para mostrar o formulário de gasto */}
        <section id="container-gastos">
        <button
          onClick={() => setShowFormGasto(true)}
        >
          Registrar Gasto
        </button>

        {/* Formulário de Gasto */}
        {showFormGasto && (
          <div>
            <button
              id="fechar"
              onClick={() => setShowFormGasto(false)}
            >
              <img
                src={closeIcon}
                alt="Fechar"
              />
            </button>
            <Form />
          </div>
        )}
        <TableGasto/>

        </section>
        
        {/* Seção de Categorias */}
        <section id="container-categorias">
          <h2 style={{marginTop:'20px'}}>Categorias</h2>
          <button
            onClick={() => setShowFormCategoria(true)}
            style={{margin:"10px"}}
          >
            Adicionar Categoria
          </button>

          {/* Formulário de Categoria */}
          {showFormCategoria && (
            <div>
              <button
                id="fechar"
                onClick={() => setShowFormCategoria(false)}
              >
                <img
                  src={closeIcon}
                  alt="Fechar"
                />
              </button>
              <CategoriaForm onSuccess={handleCategoriaSuccess} />
            </div>
          )}

          {/* Tabela de Categorias */}
          <TableCategorias ref={tableCategoriasRef}/>
        </section>
      </main>
    </div>
  );
};

export default Home;

