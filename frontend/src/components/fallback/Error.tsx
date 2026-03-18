type Props = {
    errorMessage:string,
    refetch:()=>void
}

const Error = ({errorMessage,refetch}: Props) => {
  return (
   <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        {errorMessage? errorMessage:"Something went wrong!"}
        <span onMouseDown={() => refetch()}>Refetch</span>
      </div>
        

  )
}

export default Error