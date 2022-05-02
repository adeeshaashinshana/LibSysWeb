import caseConverter from "./letterCaseConverter";
import {
  returnStatusEnum,
  fineStatusEnum,
  bookTypeEnum,
} from "../Shared/enums";

const textStyler = (status) => {
  let textColor;

  switch (status) {
    case returnStatusEnum.PENDING:
      textColor = "text-warning";
      break;
    case returnStatusEnum.RETURNED:
      textColor = "text-success";
      break;
    case returnStatusEnum.OVERDUE:
      textColor = "text-danger";
      break;
    case bookTypeEnum.REFERENCE:
      textColor = "text-info";
      break;
    case bookTypeEnum.LENDING:
      textColor = "text-primary";
      break;
    case fineStatusEnum.NO_FINE:
      textColor = "text-light";
      break;
    case fineStatusEnum.PAID:
      textColor = "text-success";
      break;
    case fineStatusEnum.UNPAID:
      textColor = "text-danger";
      break;
    default:
      textColor = "text-light";
      break;
  }

  return <span className={textColor}> {caseConverter(status)} </span>;
};

export default textStyler;
