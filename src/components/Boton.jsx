import ButtonLoading from "./ButtonLoading";

const Boton = ({ texto, type, color = "purple", loading, onClik }) => {
 
 if (loading) return <ButtonLoading />


const standardClass = "text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
let classColor; //Let por que cambia la variable
if(color === "blue"){ classColor = " bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"}
if(color === "purple") {classColor = " bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"}
if(color === "red") {classColor = " bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"}
if(color === "yellow") {classColor = " bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300  dark:bg-yellow-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"}
  return (
    <button
      onClick={onClik}
      type={type}
      className={standardClass + classColor}
    >
      {texto}
    </button>
  );
};

export default Boton;
