import React,{useEffect,useState} from "react";

const TableCategorias = ({ onAdd }) => {
  const [data,setData] = useState([])

  const fetchCategorias = async ()=>{
    try{
      const response = await fetch("http://localhost:8080/category/findall");
      if(!response.ok){
        throw new Error("Erro ao buscar categoria");
      }
      const result = await response.json();
      setData(result);

    }catch(error){
      console.error("Erro:", error);

    }
  };

  useEffect(()=>{
    fetchCategorias();
  },[])
  return (
    <div>
      <table className="tabela tabelaCategorias">
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
