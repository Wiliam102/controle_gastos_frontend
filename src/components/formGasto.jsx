import React,{useState, useEffect} from "react";
const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",       
    date: "",         
    description: "",  
    category: "",     // Manter o nome correto do campo como 'category'
  });
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias

  // Buscar categorias do backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/category/findall"); // URL da sua API
        const data = await response.json();
        setCategorias(data); // Atualizar estado com as categorias
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validação básica
    if (!formData.amount || !formData.date || !formData.description || !formData.category) {
      alert("Por favor! Preencha todos os campos.");
      return;
    }
  
    // Preparar os dados para envio
    const gastoParaSalvar = {
      amount: parseFloat(formData.amount), // Transformar valor em número (se necessário)
      date: formData.date,
      description: formData.description,
      category: {
        id: formData.category.id,
        name: formData.category.name,
      },
    };
  
    // Chamar a função para salvar o gasto
    await salvarGasto(gastoParaSalvar);
  
    // Resetar o formulário
    setFormData({ amount: "", date: "", description: "", category: "" });
  };
  
  const salvarGasto = async (gasto) => {
    try {
      const response = await fetch("http://localhost:8080/expense/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gasto), // Enviar o objeto completo como JSON
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao salvar o gasto: ${response.statusText}`);
      }
  
      const data = await response.json();
      alert("Gasto salvo com sucesso!");
      console.log("Resposta da API:", data);
    } catch (error) {
      console.error("Erro ao salvar gasto:", error);
      alert("Erro ao salvar o gasto. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>
          Valor:
          <input
            type="number"
            name="amount" // Nome atualizado
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Data:
          <input
            type="date"
            name="date" // Nome atualizado
            value={formData.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label> Descrição: </label><br />
        <textarea
          name="description" // Nome atualizado
          rows={5}
          cols={40}
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Categoria:
          <select
            name="category"  // Nome correto do campo
            value={formData.category?.id || ""} // Mostra o ID da categoria selecionada
            onChange={(e) => {
              const categoriaSelecionada = categorias.find(
                (categoria) => categoria.id.toString() === e.target.value
              );
              setFormData({ ...formData, category: categoriaSelecionada }); // Atualizar corretamente
            }}
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
      <button type="submit">
        Enviar
      </button>
    </form>
  );
};

export default Form;
