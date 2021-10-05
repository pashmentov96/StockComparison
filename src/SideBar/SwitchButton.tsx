import "./SwitchButton.scss";

const SWITCH_BUTTON_CLASS = "switch-button";
const SWITCH_BUTTON_SLIDER_CLASS = `${SWITCH_BUTTON_CLASS}__slider`;
const SWITCH_BUTTON_INPUT_CLASS = `${SWITCH_BUTTON_CLASS}__input`;

interface SwitchButtonProps {
  value: boolean;
  title: string;
  onChangeValue: (value: boolean) => void;
}

export function SwitchButton({
  value,
  title,
  onChangeValue,
}: SwitchButtonProps) {
  return (
    <label className={SWITCH_BUTTON_CLASS} title={title}>
      <input
        checked={value}
        type="checkbox"
        className={SWITCH_BUTTON_INPUT_CLASS}
        onChange={(event) => onChangeValue(event.target.checked)}
      />
      <span className={SWITCH_BUTTON_SLIDER_CLASS} />
    </label>
  );
}
