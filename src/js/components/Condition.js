var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var React = require('react');
var Styles = require('../styles/Styles');

var Condition = React.createClass({
  render: function () {
    let variableChooser = this.getVariableChooser();
    let operatorChooser = this.getOperatorChooser();
    let valueChooser = this.getValueChooser();
    return (
      <div className="condition-row" style={{display: 'flex'}}>
        { variableChooser }
        { operatorChooser }
        { valueChooser }
      </div>
    );
  },

  getVariableChooser: function () {
    let menuItems = [], title = '';
    this.props.variables.map((variable) => {
      menuItems.push(<MenuItem active={this.state.name === variable.name} onSelect={this.onVariableChange} eventKey={variable.name}>{variable.label}</MenuItem>);
      if ( variable.name === this.state.name ) {
        title = variable.label
      }
    });
    return (
      <DropdownButton title={title}>
        { menuItems }
      </DropdownButton>
    );
  },

  getOperatorChooser: function () {
    let menuItems = [], title = '';
    if ( this.state.name ) {
      let variableType = this.getVariabletypeFromName(this.state.name);
      menuItems = (this.props.variable_type_operators[variableType] || []).map((operator) => {
        if ( operator.name === this.state.operator ) {
          title = operator.label;
        }
        return <MenuItem active={this.state.operator === operator.name} onSelect={this.onOperatorChange} eventKey={operator.name}>{operator.label}</MenuItem>;
      });
    }
    return (
      <DropdownButton title={title}>
        { menuItems }
      </DropdownButton>
    );
  },

  getValueChooser: function () {
    let valueChooser = null;
    if ( this.state.name && this.state.operator ) {
      let variableType = this.getVariabletypeFromName(this.state.name);
      let inputType = null;
      this.props.variable_type_operators[variableType].forEach((operator) => {
        if ( operator.name === this.state.operator ) {
          inputType = operator.input_type;
        }
      });
      if ( inputType === 'select' ) {
        let options = this.getVariableOptionsFromName(this.state.name);
        valueChooser = (
          <DropdownButton title={this.state.value}>
            {
              options.map((option) => {
                return <MenuItem onSelect={this.onValueChange} active={this.state.value === option} eventKey={option}>{option}</MenuItem>;
              })
            }
          </DropdownButton>
        );
      } else if ( inputType === 'numeric' || inputType === 'text' ) {
        valueChooser = <input style={Styles.input} value={this.state.value} className="condition-value" onChange={this.onValueChange}/>;
        valueChooser = <Input type="text" value={this.state.value} className="condition-value" onChange={this.onValueChange}/>;
      }
    }
    return valueChooser;
  },

  getVariabletypeFromName: function (name) {
    let variableType = null;
    this.props.variables.forEach((variable) => {
      if ( variable.name === name ) {
        variableType = variable.field_type;
      }
    });
    return variableType;
  },

  getVariableOptionsFromName: function (name) {
    let options = null;
    this.props.variables.forEach((variable) => {
      if ( variable.name === name ) {
        options = variable.options;
      }
    });
    return options;
  },

  onVariableChange: function (e, name) {
    e.preventDefault();
    let variableType = this.getVariabletypeFromName(name);
    let operator = this.props.variable_type_operators[variableType] && this.props.variable_type_operators[variableType][0].name;
    this.setState({ name, operator });
  },

  onOperatorChange: function (e, operator) {
    e.preventDefault();
    this.setState({operator});
  },

  onValueChange: function (e, value) {
    e.preventDefault();
    value = value || e.target.value;
    this.setState({value});
  },

  getInitialState: function () {
    let condition = this.props.condition.name ? this.props.condition : {name: this.props.variables[0].name};
    return {
      name: condition.name,
      operator: condition.operator,
      value: condition.value,
    };
  },

  getDefaultProps: function () {
    return {condition: {}};
  },

  getData: function () {
    return this.state;
  },

});

module.exports = Condition;
