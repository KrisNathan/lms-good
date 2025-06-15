interface Props {
  icon: string;
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CardSideButton({ icon, text, className = '', onClick = (e) => { } }: Props) {
  return <button className={`flex flex-row w-fit gap-1 px-5 items-center hover:cursor-pointer ${className}`}
    onClick={onClick}>
    <img src={icon}></img>
    <div>{text}</div>
  </button>
}