import ColecaoCliente from "../firebase/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import { useEffect, useState } from "react";
import useTableouForm from "./useTabelaOuForm";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente(); 

    const{ tabelaVisivel, exibirTabela, exibirFormulario} = useTableouForm();

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([]);
    
    useEffect(obeterTodos, []);
  
    function obeterTodos(){
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        exibirTabela();
      })
    }
  
    function selecionarCliente(cliente: Cliente) {
      setCliente(cliente);
      exibirFormulario();
    }
    async function exlcuirCliente(cliente: Cliente) {
      await repo.excluir(cliente);
      obeterTodos();
    }
  
    function novoCliente() {
      setCliente(Cliente.vazio());
      exibirFormulario();
    }
    
    async function salvarCliente(cliente: Cliente) {
      await repo.salvar(cliente);
      exibirTabela();
      obeterTodos();
    }

    return {
        cliente,
        clientes,
        novoCliente,
        salvarCliente,
        exlcuirCliente,
        selecionarCliente,
        obeterTodos,
        tabelaVisivel,
        exibirTabela
    }
}