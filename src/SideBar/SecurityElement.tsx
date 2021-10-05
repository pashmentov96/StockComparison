import "./SecurityElement.scss";

import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addTicker, removeTicker, replaceTicker } from "../Actions";
import { RootState } from "../Reducers";

interface SecurityElementProps {
  secId: string;
  name: string;
  price?: number;
}

const PREFIX_CLASS = "security-element";
const SELECTED_SECURITY_ELEMENT = `${PREFIX_CLASS}--selected`;
const SECURITY_NAME_CLASS = `${PREFIX_CLASS}__name`;
const SECURITY_PRICE_CLASS = `${PREFIX_CLASS}__price`;
const SECURITY_ACTION_ICON_CLASS = `${PREFIX_CLASS}__action-icon`;

export function SecurityElement({ secId, name, price }: SecurityElementProps) {
  const selectedTickers = useSelector(
    (state: RootState) => state.ticker.selectedTickers
  );

  const dispatch = useDispatch();

  const onShareClick = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    if (selectedTickers.length === 1 && !selectedTickers.includes(secId)) {
      const oldTicker = Array.from(selectedTickers)[0];
      dispatch(replaceTicker(oldTicker, secId));
    }
  };

  const onRemoveShareFromCompare =
    (secId: string) => (event: React.MouseEvent) => {
      event.stopPropagation();

      if (selectedTickers.length > 1) {
        dispatch(removeTicker(secId));
      }
    };

  const onAddShareToCompare = (secId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();

    dispatch(addTicker(secId));
  };

  const isSelected = selectedTickers.includes(secId);
  const className = classNames(PREFIX_CLASS, {
    [SELECTED_SECURITY_ELEMENT]: isSelected,
  });

  return (
    <div className={className} onClick={onShareClick(secId)}>
      <span className={SECURITY_NAME_CLASS}>{name}</span>
      {price !== undefined && (
        <span className={SECURITY_PRICE_CLASS}>{price}</span>
      )}
      <button
        className={SECURITY_ACTION_ICON_CLASS}
        onClick={
          isSelected
            ? onRemoveShareFromCompare(secId)
            : onAddShareToCompare(secId)
        }
        title={isSelected ? "Remove from compare" : "Add to compare"}
      >
        <FontAwesomeIcon icon={isSelected ? faTimesCircle : faCheckCircle} />
      </button>
    </div>
  );
}
