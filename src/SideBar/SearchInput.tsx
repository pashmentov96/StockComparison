import "./SearchInput.scss";

import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchInputProps {
  value: string;
  onChangeValue: (value: string) => void;
  placeholder: string;
}

const SEARCH_INPUT_WRAPPER_CLASS = "search-input-wrapper";
const SEARCH_INPUT_CLASS = "search-input";
const SEARCH_INPUT_RESET_CLASS = `${SEARCH_INPUT_WRAPPER_CLASS}__reset`;

export function SearchInput({
  placeholder,
  value,
  onChangeValue,
}: SearchInputProps) {
  return (
    <div className={SEARCH_INPUT_WRAPPER_CLASS}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
        className={SEARCH_INPUT_CLASS}
      />
      <button className={SEARCH_INPUT_RESET_CLASS}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => onChangeValue("")}
          title="Clear search"
        />
      </button>
    </div>
  );
}
