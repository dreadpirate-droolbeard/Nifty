import React from "react";

export function SubmitButtons({onCancel}: {onCancel: () => void}): React.ReactElement {
  return(
    <div className="buttons-wrapper">
      <button
        className={"submit-button"}
        type="submit"
      >
        Submit
      </button>
      <button
        className={"cancel-button"}
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  )
}