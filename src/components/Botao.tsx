interface BotaoProps {
    cor?: "green" | "blue" | "gray";
    className?: string;
    children: any;
    onClick?: () => void;
}   

const colorClasses = {
    green: 'bg-gradient-to-r from-green-500 to-slate-500',
    blue: 'bg-gradient-to-r from-blue-500 to-slate-500',
    gray: 'bg-gradient-to-r from-gray-500 to-slate-500',
};

export default function Botao(props: BotaoProps) {
    const colorClass = props.cor ? colorClasses[props.cor] : colorClasses.gray;
    return (
        <button onClick={props.onClick} className={`
            ${colorClass} text-white px-4 
            py-2 rounded-xl ${props.className}`}>
            {props.children}
        </button>
    )
}