import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {
    
    #conversor = {
        toFirestore(cliente: Cliente){
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente);
            return cliente;
        } else {
            const docRef = await this.colecao().add(cliente);
            const doc = await docRef.get();
            const data = doc.data();
            return data ? data : new Cliente('', 0); // Add null check and return a default Cliente object if data is undefined
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).delete();
        } else {
            console.error('Cliente ID is null or undefined');
        }
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get();
        return query.docs.map(doc => doc.data()) ?? [];
    }

    private colecao() {
        return firebase.firestore().collection('clientes')
            .withConverter(this.#conversor);
    }
}