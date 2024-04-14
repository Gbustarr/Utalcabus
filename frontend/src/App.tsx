import AutenticacionAdministrador from './pages/AutentiacionAdministrador';

function App() {

  return (
    <>
      <div className="text-white bg-cyan-500 h-screen flex items-center justify-center font-semibold text-2xl flex flex-col">
        <div> Holi - Soy una Pagina por Defecto con React Ts + Vite + Tailwind</div>
        <div>
          <img src="https://pbs.twimg.com/media/GK0EsLMWEAAmoUb?format=jpg&name=small" className="h-96 w-96 mt-12"></img>
        </div>
        <div className="text-green-400">Made By konungrDRAGO2</div>
      </div>
       {/*<AutenticacionAdministrador></AutenticacionAdministrador>*/}  // Descomentar para ver la pagina de autenticacion

    </>
    
  )
}

export default App
