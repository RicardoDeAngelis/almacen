 
  (async function load (){
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
// ip publica http://181.10.101.145 192.168.1.10:8080/v1/productos 
// const list = await getData('http://192.168.1.7:8080/almacen/v1/productos');

const list = await getData('https://almacen-moni-pepe.herokuapp.com/v1/productos');
const categorias = await getData('https://almacen-moni-pepe.herokuapp.com/v1/categorias')
// https://44453b16f9d5.ngrok.io/almacen/v1/productos
    
//    const uno = await getData('http://192.168.1.7:8080/almacen/v1/productos/6');
  
 console.log('Todos las categorias:',categorias);
    // console.log('Todos los productos:',list);
    //  console.log('Producto:',uno);
      // console.log('Todos los productos:',list);

          // buscar
 const formulario = document.querySelector('#form');
 const boton = document.querySelector('#boton');
 const resultado = document.querySelector('#resultado');
 const contenido = document.querySelector('#contenido');
 const select = document.querySelector('#select');

   
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
        //  <td>${product.fechaVencimiento}</td> 
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
 
 
 // mandando datos de un form con post funcionando ok
  

 const formulario = document.getElementById('formulario');
 formulario.addEventListener('submit',function(event){
     event.preventDefault();
 
     let datos = new FormData(formulario);
     // let fecha= new Date();
          // let id=datos.get('idProducto');
          const crear = (`https://almacen-moni-pepe.herokuapp.com/v1/producto`);
          const crearCategoria = (`https://almacen-moni-pepe.herokuapp.com/v1/categoria`);
          // const edit = (`http://192.168.1.7:8080/alamcen/v1/producto/${id}`);
  //    console.log('datos',datos.get);
  //    console.log('id: ',datos.get('idProducto'));
     // console.log('nombre: ',datos.get('nombreProducto'));
     // console.log('precio: ',datos.get('precioProducto'));
     // console.log('fecha: ',datos.get('fechaVencimiento'));
 
     fetch(crear,{
 
         method: 'POST',
         body: JSON.stringify({
             nombreProducto:datos.get('nombreProducto'),
             precioProducto:datos.get('precioProducto'),
            //  fechaVencimiento:datos.get('fechaVencimiento'),
         }) ,
         headers:{
         'Content-Type':'application/json; charset=UTF-8'
         }
         
         
     })
     .then(res=>res.json())
     .then(data=>{
         console.log('los datos enviados son: ',data);
         alert('datos enviado correctamente')
     })

    //  fetch(crearCategoria,{
 
    //     method: 'POST',
    //     body: JSON.stringify({
    //         nombreCategoria:datos.get('nombreCategoria'),
        
    //     }) ,
    //     headers:{
    //     'Content-Type':'application/json; charset=UTF-8'
    //     }
        
        
    // })
    // .then(resp=>resp.json())
    // .then(datas=>{
    //     console.log('los datos enviados son: ',datas);
    //     alert('datos enviado correctamente')
    // })
 })


