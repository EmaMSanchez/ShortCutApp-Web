
import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import Boton from "../components/Boton";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormErrors from "../components/FormErrors";
import { errorFirebase } from "../utils/errorFirebase";



const Home = () => {

  const {data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
  const [newOriginId, setNewOriginId] = useState();
  const { required,patternURL } = formValidate();
  const [copy, setCopy] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField, //Metodo que permite resetear cualquier campo, recive como parametro la key (nombre del input)
    setValue, //Metodo que permite setear valores de los input, recive como argumento la key(nombre del input) y el valor a setear
    setError,
  } = useForm();

  useEffect(() => {
    console.log('getData')
    getData();
  }, []); //use efect asegura que se ejecute al menos 1 vez la funcion getData (hace que se ejecute getData, al ser llamado useFirestore)

//Hook se debe poner antes del loading, si no nunca se hace el llamado a la bd (no cumpliria con el if nunca)

  if(loading.getData) return <p>Loading data...</p> 
  if(error) return <p>{error}</p>

  const onSubmit = async({url}) => {
    try {
      if(newOriginId){ //Si existe el newOriginId (es distinto de null), el enviar llama a la funcion update en vez de la funcion add, enviando el nanoId y el valor de texto (equivale a valor de origin)
        await updateData(newOriginId, url);
        setNewOriginId("");
        
      } else {
        await addData(url) //Se hace la funcion asincrona para que el setText se ejecute una vez agregado el documento/elemento a la Basde de Datos
      }
    } catch (error) {
      const { code, message } = errorFirebase(error.code);
      setError(code, {
        message,
      });
    }finally{
      resetField("url") //EL metodo reset field recive el nombre del campo (key)
    }
  }

 const handleClikDelete = async(nanoid) =>{ //Al ser asyncorna la funcion se debe poner async, por mas que en el metodo del hook tambien ya fue llamado con async
  console.log("click")
  await deleteData(nanoid)
 }

 const handleClikEdit = async(item) =>{
  
  setValue("url", item.origin); //Se setea con el item.origin al clikear editar, el input (valor de input origin), al modificarse se modifica item.origin, luego de llamar el metodo
  setNewOriginId(item.nanoid); //Al clikear editar le da un valor a setNewOriginId, especificamente el id del item a editar
 
}

const pathURL = window.location.href //Trae el path de la URL window.location.href, se concatena con nanoId para generar una short cut

const handleClikCopy = async(nanoid) =>{

  await navigator.clipboard.writeText(pathURL + nanoid) //Funcion de JS que copia contenido (PORTAPAPELES), en este caso llega nano id y window.location.href
  console.log("copiado")
  setCopy(() => (nanoid));
}



  return (
    <> 
    {/*Fragment */}
    <Title titulo="Home"/>

    <form onSubmit={handleSubmit(onSubmit)}>
     
    <FormInput
          type="text"
          placeholder="http://xxxxxx.xxx"
          label="Ingresa tu URL"
          autoComplete="username"
          id="url"
          error={errors.url}
          {...register("url", { required, pattern: patternURL })}
        >
           <FormErrors error={errors.url} />
        </FormInput>

       { 
        newOriginId ? (
          <Boton
          type="submit"
          texto="EDIT URL"
          color="yellow"
          loading={loading.updateData}
          /> )
          :
        (<Boton
          type="submit"
          texto="ADD URL"
          color="purple"
          loading={loading.addData}
          />
        )
        //Si la variable newOriginId contiene algun valor muestra un boton, si no, muestra el otro boton
       }
      
       
    </form>
    {
      data.map (item => (
        <div key={item.nanoid} className="p-6 bg-white border border-gray-200 rounded-lg shadow mt-2 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pathURL}{item.nanoid}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
        <div className="space-x-2">
          <Boton
       type="button"
       texto="Delete"
       color="red"
       loading={loading[item.nanoid]} //Se le envia el item. nanoid en loading para controlar el true o false del seteo, los [] llaman a el atributo (similar a loading.addData/delete,etc), pero se usan los [] por si en el nano id existiere un caracter extraño
       onClik ={() => handleClikDelete(item.nanoid)}
       />
            <Boton
       type="button"
       texto="Edit"
       color="yellow"
       onClik ={() => handleClikEdit(item)}
       />
       <Boton
       type="button"
       texto={copy === item.nanoid ? "Copied!" : "Copy"}
       color="blue"
       onClik ={() => handleClikCopy(item.nanoid)}
       />
       </div>
        </div>
      ))
    }
    </>
  );
}

export default Home