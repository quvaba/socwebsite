import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Topic extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selected: ""
    }
  }

  handleClick(e){
    this.props.onClick(this.props.name);
  }

  render(){
    return(
      <div className={"Topic " + this.props.className + " " + this.state.selected}
            onClick={this.handleClick}
            >
        {this.props.name}
      </div>
    );
  }
}

Topic.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
