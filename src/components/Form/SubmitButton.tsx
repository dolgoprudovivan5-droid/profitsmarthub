// import React from "react";
// import {assets} from "@/assets/images/assets"

// interface SubmitButtonProps {
//   onClick: () => void;
//   disabled?: boolean;
// }

// export const SubmitButton: React.FC<SubmitButtonProps> = ({
//   onClick,
//   disabled = false,
// }) => {
//   return (
//     <button
//       type="submit"
//       className={"submit-button"}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {assets.sendIcon}
//         <span>Отправить заявку</span>
//     </button>
//   );
// };



import React from "react";
import { assets } from "@/assets/images/assets";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type="submit"
      className={`primary-button ${disabled || isLoading ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <div className="loading-spinner"></div>
          <span className={"primary-button-text"}>Отправка...</span>
        </>
      ) : (
        <>
          {assets.sendIcon}
          <span className={"primary-button-text"}>Отправить заявку</span>
        </>
      )}
    </button>
  );
};