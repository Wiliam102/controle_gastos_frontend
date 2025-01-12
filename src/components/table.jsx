import React from "react";

const Table = ({data,onEdit,onDelete}) =>{
    return(
        <table border="1px" style={{width:'100%', borderCollapse:'colapse'}}>
            <tr style={{backgroundColor:'white'}}>
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