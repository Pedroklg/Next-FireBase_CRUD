import Formulario from "../components/Formulario"
import Botao from "../components/Botao"
import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import useClientes from "../hooks/useClientes"

export default function Home() {

  const { 
      cliente, 
      clientes,
      novoCliente, 
      selecionarCliente,
      exlcuirCliente, 
      salvarCliente,
      tabelaVisivel,
      exibirTabela
    } = useClientes();
    
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-neutral-900 text-white
    `}>
      <Layout titulo="Cadastro Simples Next.js">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={exlcuirCliente}>
            </Tabela>
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={exibirTabela}>
          </Formulario>
        )}
      </Layout>
    </div>
  )
}
