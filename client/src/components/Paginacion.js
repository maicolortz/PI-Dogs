import React from 'react'

const Paginacion=({nextHandler,prevHandler,itemss,currentpage})=> {
    const items=itemss.map((item,i)=>{
        return <li key={item.id}>{item.title}</li>
    })
  return (
    <div>
        <h1>Pagina: {currentpage}</h1>
        <button onClick={nextHandler}>NEXT</button>
        <button onClick={prevHandler}>PREV</button>
        <h2>items:</h2>
        <ul>
            {items}
        </ul>
    </div>
  )
}

export default Paginacion;