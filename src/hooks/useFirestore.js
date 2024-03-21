import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { useState } from "react";
import { db, auth } from "../firebase";
import { nanoid } from "nanoid"; 

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({}); //Se gestiona el loading como un objeto para tener mutliples estados dentro



  const getData = async () => {
    console.log(auth.currentUser)
    try {
      setLoading(prev =>({...prev, getData: true})); //Setea el loading en true para mostrar que la app esta cargando los datos mientras se procesa el await, se setea con la informacion previa
      const dataRef =  collection(db, "urls") //Se LLAMA a la COLECCION (simil tabla de base de datos) con el metodo colection, este metodo recive la coneccion de la base de datos (base de datos)-> (db) y el nombre de la coleccion a traer en string ("urls"), dicha informacion se guarda en una referencia para ser filtrado los datos a mostrar(buenas practicas)
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid)) // Q es la query o pedido de informacion a la base de datos, esta recive el metodo query que contiene la referencia de coleccion de la base de datos y utiliza el metodo where que filtra los dato, reciviendo el nombre del campo a filtrar(generalmete el ID), y el dato filtrado (ID coincidente), trayendo solamente los datos de x usuario solamente, se accede a AUTH que posee el metodo o propiedad que nos devuelve la sesion del usuario activo (enta a el usuario y a su propiedad uid (user id) PROPIA de FIREBASE(no firestore))
      const querySnapshot = await getDocs(q); //getDocas es un metodo que OBTIENE los datos de la query, esperando la coneeccion de la base de datos que comienza la obtencion de dichos datos al mandarle la query(pedido a la base de datos que contiene la coneeccion de credenciales, nombre de la base de datos y filtrado), reciviendo un objeto con dichos datos
      //Tanto get doc, como getDocs trae un metodo data(), que permite extraer del objeto cada atributo o metodo del documento (informacion del objeto y sus elemetnos)
      const dataDB = querySnapshot.docs.map((doc) => doc.data()); //querySnapshot.docs, permite ingresar a el objeto obtendio, a travez de un map recorriendo los campos de dicho arreglo de objetos. En esste caso solo se llama a la data por que cada registro se inicializa con nanoio id, pero, si no, CASOS DONDE SE NECESITA EL ID POR NO TENER naniId ({id: doc.id, ...doc.data()})
      setData(dataDB); //Si la coneccion es exitosa se guarda el objeto o coleccion de objetos, dando acceso final
    } catch (error) { //Si existe un  error se guarda y setea para enviarlo
      console.log(error);
      setError(error.menssage); //Se envia el mensaje de error en caso de fallo de coneccion
    } finally {
      setLoading(prev =>({...prev, getData: false})); //Setea en falso el cargar la app para que no se muestre, agregando un campo extra a el objeto de estado (addData seteandolo en falso)
    }
  };

   const addData = async(url)=>{
    try {
      setLoading(prev =>({...prev, addData: true})); //El estado de loading se maneja como un objeto, se le agrega un atributo/propiedad (addData) inicializado en true, SE TRAE LA INFORMACION PREvIA PARA NO modificar los otros ESTADOS (dentro de los atributos) de LOADING
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6), //Funcion importada que genera id aleatorios, recive cantidad de caracteres maximos por id, en este caso 6
        origin: url,
        uid: auth.currentUser.uid
      }

      const docRef = doc(db, "urls", newDoc.nanoid) //El documento para ser agregado se debe llamar a la referencia, trayendo la coneccion (db, a que base de datos se conecta) y elcoleccion donde se guarda, y el id del documento (en este caso gestionado por nanoID), setDoc es para actualizar o crear un documento completo a base de pasarle un uid, para agregar un documento sin setear el id a manejar se utiliza addDoc (ADDDOC())
      await setDoc(docRef, newDoc) // await (funciones que hacen solicitud o query) Set doc sirve para agregar datos a la base de datos firestore (setea los documentos de la coleccion), set docs recive un id (se debe gestionar manualmente), si no se quiere gestionar manualmente si no automaticamente debe utilizarse ADDDOC(addDoc), pasando como parametro (collection(db,"nombre coleccion")), {campo de documento1: abc, campo documento2:cde}(atributos serian), DOCREF(dorRef), recive la referencia (base de datos a conectarse, coleccion y id) y la DATA(en este caso newDoc), que contiene el objeto con todos los campos/atributos
      setData([...data,newDoc]) //SE SETEA LOCALMENTE el nuevo documento, para no realizar una nueva peticion a la DB y tenga que traer toda la informacion nuevamente, usando el spreedOperator y agregandole el nuevo objeto o documento
    } catch (error) {
      console.log(error)
      setError(error.menssage);
    }finally{
      setLoading(prev =>({...prev, addData: false}));  //El estado de loading se maneja como un objeto, se setea el atributo del objeto (addData) en false
    }
   }

   const deleteData = async(nanoid) =>{ //Nos llega el nanoId a eliminar
    try {
      setLoading(prev =>({...prev, [nanoid]: true}));  //En este caso el loading, recae sobre el nano id (se crea un loading para cada dato), ademas de acceder a el string
      const docRef = doc(db, "urls", nanoid); //Se crea un docRef con la coneccion de la base de datos, el nombre de la coleccion y el id del documento a eliminar
      await deleteDoc(docRef); // deleteDoc, es una funcion de firebase que permite eliminar un documento, recive solo la referencia (docRef)
      setData(data.filter(item => item.nanoid !== nanoid)) //Para no hacer una  nueva peticion a la base de datos, luego de borrar la data se setea la informacion de manera LOCAL, en este caso se setea de la data(todos los datos),  con el FILTER (permite filtrar datos), en este caso filtrando toda la data y devolviendo aquela que sea distinta de nano id (nanoId !== data.nanoId) 
     
    } catch (error) {
      console.log(error)
      setError(error.menssage);
    }finally{
      setLoading(prev =>({...prev, [nanoid]: false}));   //LLEVA [], por si el nano id posee algun caracter extraño, aceptando la propiedad de objeto
    }
   }
 

   const updateData = async (nanoid, newOrigin) => { //Nos llega el nanoId a modificar y el url (origin modificado)
    try {
      setLoading(prev =>({...prev, updateData: true})); 
      const docRef = doc(db, "urls", nanoid); 
      await updateDoc(docRef, {origin: newOrigin});
      setData(data.map(item => item.nanoid === nanoid ? ({...item, origin:newOrigin}) : item)) //Este codigo actualiza de manera local la data, recorriendo con un map la data, en caso de que le nano id enviado desde la vista coincida, setea el origin con el newOrigin(text), mandado de la vista, si no devuelve el item tal cual esta
    } catch (error) {
      console.log(error)
      setError(error.menssage);
    }finally{
      setLoading(prev =>({...prev, updateData: false}));   //LLEVA [], por si el nano id posee algun caracter extraño, aceptando la propiedad de objeto
    }
   }

   const searchData = async (nanoid) =>{
    try { 
      const docRef = doc(db, "urls", nanoid); 
      console.log({nanoid})
      const docSnap = await getDoc(docRef); 
      console.log(docSnap.data().origin)
      return docSnap

    } catch (error) {
      console.log(error)
      setError(error.menssage);  
      //Get doc trae solo el documento en especifico, recive como referencia el docRef
    }
   }

  //Se crea una funcion o hook que retorna los datos de la base de datos, el estado de si esta cargando datos y los posibles errores de coneccion(Estructura estandard)

  return { data,
           error, 
           loading,
           getData,
           addData,
           deleteData,
           updateData,
           searchData
         };
};


