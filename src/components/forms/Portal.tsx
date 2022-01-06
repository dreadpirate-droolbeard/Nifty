import React, { PureComponent, ReactPortal } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  // node in the dcoument to attach the portal
  node?: Element;
  // displays the portal
  open?: boolean
}

export class Portal extends PureComponent<PortalProps> {
  static defaultProps = { open: true };

  render(): ReactPortal  | null {
    const {children, node, open} = this.props;
    if(!open){ return null; }
    const finalNode = node ?? document.body;
    return ReactDOM.createPortal(children, finalNode);
  }
}