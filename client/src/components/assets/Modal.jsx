import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import Tooltip from "./Tooltip";

// Källa: https://codesandbox.io/s/friendly-hofstadter-qtrtn?file=/src/index.js

class Modal extends React.Component {
    constructor(props) {
      super();
      this.escFunction = this.escFunction.bind(this);
      this.state = {
        showModal: props.openState || false
      };
    }

    escFunction(event){
      if (event.key === "Escape") this.handleClick();
    }
  
    handleClick = () => {
      if (!this.state.showModal) {
        document.addEventListener("click", this.handleOutsideClick, false);
        document.addEventListener("keydown", this.escFunction, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
        document.removeEventListener("keydown", this.escFunction, false);
        
        this.props.func ? 
        setTimeout(() => {
          this.props.func()
        }, 100)
        : null;
      }
      
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }));
    };

    handleOutsideClick = e => {
      if  (!this.node.contains(e.target)) this.handleClick() 
    };

    render() {
      return (
        <div
          ref={node => {
            this.node = node;
          }}
        >
          <Tooltip label={this.props.tooltip}>
            <span onClick={() => {this.handleClick()}} className={this.state.showModal ? this.props.activeClass + this.props.btnClass : this.props.btnClass}>{this.props.btnLabel}</span>
          </Tooltip>
          {this.state.showModal && this.props.children}
        </div>
      );
    }
  }

export default Modal;