import CLiente from "../core/Cliente";
import { IconeEdicao, IconeLixo } from "./Icones";

interface TabelaProps {
    clientes: CLiente[];
    clienteSelecionado?: (cliente: CLiente) => void;
    clienteExcluido?: (cliente: CLiente) => void;
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteSelecionado || props.clienteExcluido;

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} className={`
                    ${i % 2 === 0 ? 'bg-slate-300' : 'bg-slate-200'}`}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(cliente: CLiente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} 
                        className={`flex justify-center items-center
                        text-green-700 rounded-full p-2 m-1
                        hover:bg-gray-200
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}
                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} 
                    className={`flex justify-center items-center
                        text-red-700 rounded-full p-2 m-1
                        hover:bg-gray-200
                    `}>
                        {IconeLixo}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full overflow-hidden rounded-xl shadow-sm">
            <thead className={`
                bg-gradient-to-r from-sky-800 to-slate-500
                text-gray-200`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}