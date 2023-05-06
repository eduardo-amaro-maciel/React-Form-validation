
export default function FormContainer({ children }) {

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="w-full bg-teal-500 flex items-center justify-center h-[150px] pb-8">
        <h1 className="text-white font-bold text-4xl">Formulário</h1>
      </header>
      <div className="flex justify-center bg-slate-200 flex-1">
        <div className="w-full max-w-[840px] bg-white relative top-[-50px] h-fit rounded-lg p-3 shadow flex">
          {children}
        </div>
      </div>
    </div>
  )
}