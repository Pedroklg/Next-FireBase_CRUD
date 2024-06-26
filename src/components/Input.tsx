interface InputProps {
    tipo?: 'text' | 'number';
    texto: string;
    valor: any;
    somenteLeitura?: boolean;
    className?: string;
    valorMudou?: (valor: any) => void;
}

export default function Input(props: InputProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
        <label className="mb-2 text-lg">
            {props.texto}
        </label>
        <input 
            type={props.tipo ? props.tipo : 'text'} 
            value={props.valor}
            readOnly={props.somenteLeitura}
            onChange={e => props.valorMudou?.(e.target.value)}
            className={`
                border border-blue-400 rounded-lg
                focus:outline-none bg-gray-100 px-4 py-2
                ${props.somenteLeitura ? '' : 'focus:bg-white'}
            `}
        />
    </div>
  )
}