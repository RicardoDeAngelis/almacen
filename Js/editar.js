(async function load (){
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
// ip publica http://181.10.101.145 192.168.1.10:8080/v1/productos 
const list = await getData('https://almacen-moni-pepe.herokuapp.com/v1/productos');
    
//    const uno = await getData('http://192.168.1.7:8080/almacen/v1/productos/6');
  
    // console.log('Todos los productos:',list);
    //  console.log('Producto:',uno);
    

// buscar
const formulario = document.querySelector('#form');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');
const contenido = document.querySelector('#contenido');

  
     const filtrar = (e)=>{
      // console.log(formulario1.value);
      e.preventDefault();
      contenido.innerHTML='';
      const texto=formulario.value.toLowerCase();
      for(let product of list){
          let nombre = product.nombreProducto.toLowerCase();
          if(nombre.indexOf(texto) !== -1){
              contenido.innerHTML +=
              // llenar una tabla
          `
          <tr>
          <th scope="row">${product.idProducto}</th>
          <td>${product.nombreProducto} </td>
          <td>${product.precioProducto}</td>

           
        </tr>
        `
        // <td>${product.fechaVencimiento}</td>
    }
      }
      if(resultado.innerHTML ===''){
          resultado.innerHTML +=`
          <li>Producto inexistente</li>`
      }
  }
        boton.addEventListener('click',filtrar);
        formulario.addEventListener('keyup',filtrar);

      //   llamndo a la funcion comienza el sitio con la funcion activa
      //   filtrar();  
  

})();



// mandando datos de un form con pastch funcionando ok


const formularioEdit = document.getElementById('formularioEdit');
formularioEdit.addEventListener('submit',function(event){
   event.preventDefault();

   let datosEdit = new FormData(formularioEdit);
        let id=datosEdit.get('idProducto');
        const edit = (`https://almacen-moni-pepe.herokuapp.com/v1/producto/${id}`);   
             console.log('id: ',datosEdit.get('idProducto'));
   console.log('nombre: ',datosEdit.get('nombreProducto'));
   console.log('precio: ',datosEdit.get('precioProducto'));
//    console.log('fecha: ',datosEdit.get('fechaVencimiento'));

   fetch(edit,{

       method: 'PATCH',
       body: JSON.stringify({
           nombreProducto:datosEdit.get('nombreProducto'),
           precioProducto:datosEdit.get('precioProducto'),
        //    fechaVencimiento:datosEdit.get('fechaVencimiento')
       }) ,
       headers:{
       'Content-Type':'application/json; charset=UTF-8'
       }
       
       
   })
   .then(resp=>resp.json())
   .then(data=>{
       console.log('los datos enviados son: ',data);
       alert('datos enviado correctamente')
   })

})
