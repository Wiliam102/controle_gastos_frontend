import React from "react";
import '../css/style.css'

const Table = ({data,onEdit,onDelete}) =>{
    return(
        <table className="tabela">
            <tr>
                <th>Id</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Descricão</th>
                <th>Categoria</th>
                <th>Ações</th>
            </tr>
            <tbody>
                {data.map((item)=>(
                   <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.category.name}</td>
                    <td>
                        <button onClick={()=> onEdit(item.id)}>Editar</button>
                        <button onClick={()=> onEdit(item.id)}>Excluir</button>
                        
                    </td>
                   </tr>
                   
                ))}
            </tbody>
        </table>

    );
};
export default Table