import React, { useContext, useState } from "react";
import { RelativeAllowances } from "../../common/constants";
import { iFormControls } from "../../common/types";
import { DappContext } from "../../contexts/MintContext";
import { SubmitButtons } from "../buttons/SubmitButtons";
import { ModalWrapper } from "../wrappers/ModalWrapper";


export function ApproveTokenForm(props: iFormControls): React.ReactElement {
  const [ amount, setAmount ] = useState<number>(0);
  const [ relative, setRelative ] = useState<RelativeAllowances>(RelativeAllowances.EQUAL);
  const { allowance, setApproval } = useContext(DappContext);

  function onSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    evt.stopPropagation();

    setAmount(0);
    setRelative(RelativeAllowances.EQUAL);
    props.setShowForm(false);

    setApproval(amount, relative);
  }

  function onCancel(): void {
    setAmount(0);
    setRelative(RelativeAllowances.EQUAL);
    props.setShowForm(false);
  }

  let max = 2**256;  // unit256 max
  let min = 0;

  switch(relative){
    case RelativeAllowances.EQUAL:{
      // defaults are ok
      break;
    }
    case RelativeAllowances.INCREASE:{
      max = 2**256 - allowance;
      min = 1;
      break;
    }
    case RelativeAllowances.DECREASE:{
      max = allowance;
      min = 1;
      break;
    }
  }

  return(
    <ModalWrapper displayModal={props.showForm}>
      <form 
        className="form approve"
        onSubmit={(evt):void => onSubmit(evt)}
      >
        <div className="title">
          Set approval for Blood token:
        </div>
        <div className="row description">
          This is the amount of BLOOD authorized to spend on your behalf before requiring more confirmation.
        </div>
        <div className="row description">
          Note: the allowance balance may take a few minutes to update until transaction has completed.
        </div>
        <div className="input-wrapper">
          {/* <label htmlFor="token-approval-input">Amount:</label> */}
          <select name="token-approval-relative" onChange={(evt):void => setRelative(evt.currentTarget.value as RelativeAllowances)}>
            <option value={RelativeAllowances.EQUAL}>{RelativeAllowances.EQUAL}</option>
            <option value={RelativeAllowances.INCREASE}>{RelativeAllowances.INCREASE}</option>
            <option value={RelativeAllowances.DECREASE}>{RelativeAllowances.DECREASE}</option>
          </select>
          <input
            id="token-approval-input"
            className="token-approval-input"
            type="number"
            max={max}
            min={min}
            step={1}
            title={"Set approval amount."}
            onChange={(event):void => setAmount(event.target.valueAsNumber)}
            value={amount}
            required
          />
        </div>
        <SubmitButtons onCancel={onCancel} />
      </form>
    </ModalWrapper>
  )
}