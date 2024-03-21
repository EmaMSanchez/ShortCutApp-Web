
const FormErrors = ({error}) => {
  return (
    <>
    {error && <p className="my-4 text-sm text-red-600"><span className="font-medium">Ooops! </span>{error.message}</p>}
    </>
  )
}

export default FormErrors