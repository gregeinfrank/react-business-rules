var React = require('react');
var Styles = require('../styles/Styles');

var Condition = React.createClass({
  render: function () {
    let variableChooser = this.getVariableChooser();
    let operatorChooser = this.getOperatorChooser();
    let valueChooser = this.getValueChooser();
    return (
      <div className="condition-row">
        { variableChooser }
        { operatorChooser }
        { valueChooser }
      </div>
    );
  },

  getVariableChooser: function () {
    return (
      <select style={Styles.select} value={this.state.name} onChange={this.onVariableChange} className="condition-name">
        {
          this.props.variables.map((variable) => {
            return <option key={variable.name} value={variable.name}>{variable.label}</option>;
          })
        }
      </select>
    );
  },

  getOperatorChooser: function () {
    let operatorsList = [];
    if ( this.state.name ) {
      let variableType = this.getVariabletypeFromName(this.state.name);
      operatorsList = this.props.variable_type_operators[variableType] || [];
    }
    return (
      <select style={Styles.select} value={this.state.operator} onChange={this.onOperatorChange} className="condition-operator">
        {
          operatorsList.map((operator) => {
            return <option key={operator.name} value={operator.name}>{operator.label}</option>;
          })
        }
      </select>
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
          <select style={Styles.select} value={this.state.value} className="condition-value" onChange={this.onValueChange}>
            {
              options.map((option) => {
                return <option key={option}>{option}</option>;
              })
            }
          </select>
        );
      } else if ( inputType === 'numeric' || inputType === 'text' ) {
        valueChooser = <input value={this.state.value} className="condition-value" onChange={this.onValueChange}/>;
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

  onVariableChange: function (e) {
    e.preventDefault();
    let name = e.target.value;
    let variableType = this.getVariabletypeFromName(name);
    let operator = this.props.variable_type_operators[variableType] && this.props.variable_type_operators[variableType][0].name;
    this.setState({ name, operator });
  },

  onOperatorChange: function (e) {
    e.preventDefault();
    this.setState({operator: e.target.value});
  },

  onValueChange: function (e) {
    e.preventDefault();
    this.setState({value: e.target.value});
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

});

module.exports = Condition;
