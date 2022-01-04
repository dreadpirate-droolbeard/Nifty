import React, { useState, useRef } from "react";

import Hamburger from "./Hamburger";

// import { useOnClickOutside } from "./ClickOutside";
import MusicHook from "../wrappers/Music";
import { ConnectWallet } from "../buttons/ConnectWallet";
import { HeaderLinks } from "./HeaderLinks";
import { MessageSwitch } from "../messages/MessageSwitch";
import { ApproveToken } from "../buttons/ApproveToken";
import { ClaimToken } from "../buttons/ClaimToken";
import { AllowanceBalance } from "../messages/AllowanceBalance";

const Menu = (): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = (): void => setOpen(false);

  // Currently not using as menu only on mobile... and forms are unwantedly triggering close
  // useOnClickOutside(node, () => setOpen(false)); 

  return (
    <div className="menu-wrapper" ref={node}>
      <nav className={ `nav-menu ${open ? "open" : "closed"}`}>
        <MusicHook />
        <HeaderLinks onClick={close} />
        <div className="token-interaction-container">
          <AllowanceBalance />
          <ApproveToken />
          <ClaimToken />
        </div>
        <MessageSwitch />
        <ConnectWallet />
      </nav>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu;