import React, {useContext, useState} from "react";
import { ApproveTokenForm } from "../forms/ApproveTokenForm";
import { DappContext } from "../../contexts/MintContext";

export function ApproveToken(): React.ReactElement {
  const { userAddress } = useContext(DappContext);
  const [showApprove, setShowApprove ] = useState(false);

  function approveToken(): void {
    setShowApprove(true)
  }

  return (
    <div className="approve-token-wrapper">
      <button
        disabled={ userAddress === undefined }
        className="approve-token-button"
        type="button"
        onClick={approveToken}
        title="Set token approval for BLOOD"
      >
        Allowance Approval
      </button>
      <ApproveTokenForm
        tokenId={-1} //unused for this component
        showForm={showApprove}
        setShowForm={setShowApprove}
      />
    </div>
  );
}
