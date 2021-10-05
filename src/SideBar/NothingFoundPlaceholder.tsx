import "./NothingFoundPlaceholder.scss";

import { faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NOTHING_FOUND_PLACEHOLDER_CLASS = "nothing-found-placeholder";

export function NothingFoundPlaceholder() {
  return (
    <div className={NOTHING_FOUND_PLACEHOLDER_CLASS}>
      <FontAwesomeIcon icon={faFrown} size={"2x"} />
      <span>Nothing found...</span>
    </div>
  );
}
