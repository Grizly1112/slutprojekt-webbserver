import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Källkod: https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js
// 

class Modal extends React.Component {
    constructor(props) {
      super();
      this.escFunction = this.escFunction.bind(this);
      this.state = {
        showModal: props.openState
      };
    }

    escFunction(event){
        if (event.key === "Escape") {
           this.handleClick();
        }
    }
  
    handleClick = () => {
      if (!this.state.showModal) {
        document.addEventListener("click", this.handleOutsideClick, false);
        document.addEventListener("keydown", this.escFunction, false);
    } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
        document.removeEventListener("keydown", this.escFunction, false);
      }
  
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }));
    };
  
    handleOutsideClick = e => {
      if (!this.node.contains(e.target)) this.handleClick();
    };

    render() {
      return (
        <div
          ref={node => {
            this.node = node;
          }}
        >
          <span onClick={this.handleClick} className={this.props.btnClass}>{this.props.btnLabel}</span>
          {this.state.showModal && (
            // <div className="modal">
            //   I'm a modal!
            //   <button onClick={() => this.handleClick()}>close modal</button>
            // </div>
            this.props.children
          )}
        </div>
      );
    }
  }

export default Modal;