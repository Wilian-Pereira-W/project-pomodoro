interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
function Button(props: Props): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
      type="button"
    >
      {props.text}
    </button>
  );
}

export default Button;
