import React, { PureComponent, ReactElement } from "react";
import { Portal } from "./Portal";

export interface ModalProps {
// extends OAtributes {
  // displays the close button in the modal 
  displayClose?: boolean

  // custome close icon
  // closeIcon?: OIcon;

  //custom close icon props and styles
  // closeiconProps?: Buttonprops;

  //custom styles for the modal-content div
  // contentStyles?: OStyles;

  //custom styles for the modal-overlay div
  // overlayStyles?: OStyles;

  //id of the modal
  id?: string;

  inset?: string;

  open?: boolean;

  onClose?:(event: React.MouseEvent< HTMLElement, MouseEvent>) => void | any;
}

export class Modal extends PureComponent<ModalProps> {
  static defaultProps ={
    closeIcon: {faType: "solid", faIcon: "window-close"},
    closeIconProps: {},
    displayClose: true,
    id: "modal",
    open: false,
    onClose: ():void => {/* noOp */},
  }

  onClose(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const { onClose } = this.props;
    if (onClose){
      onClose(event)
    }
  }

  renderCloseIcon(): ReactElement | null {
    const { 
      // closeIcon,
      // closeIconProps: props,
      displayClose
    } = this.props;

    if(!displayClose){ return null;}
    // const Tag = "i" as string; // tag as string; where tag = 'i' | FontAwesomeIcon | CustomIcon | etc.
    return (
    <button>
      <i  //<Tag
        className= {"modal-close-icon"}
        onClick = {this.onClose.bind(this)}
        />
    </button>
    )
  }

  renderContent(): ReactElement {
    const { children } = this.props;
    return (
      <div className={"modal-content"} >
        {this.renderCloseIcon()}
        {children}
      </div>
    );
  }

  render(): ReactElement | null {
    const {open} = this.props;
    if (!open ) {return null;}
    return (
      <Portal>
        <div className={"modal-overlay"} id={"modal"}>
          {this.renderContent()}
        </div>
      </Portal>
    )
  }
}