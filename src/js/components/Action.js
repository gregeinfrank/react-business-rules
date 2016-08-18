var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var React = require('react');
var Styles = require('../styles/Styles');

var Action = React.createClass({
  render: function () {
    let actionChooser = this.getActionChooser();
    let paramsChoosers = this.getParamsChoosers();
    return (
      <div className="action-row" style={{display: 'flex'}}>
        { actionChooser }
        { paramsChoosers }
      </div>
    );
  },

  getActionChooser: function () {
    let menuItems = [], title = '';
    this.props.actionTypes.forEach((action) => {
      menuItems.push(<MenuItem active={this.state.name === action.name} key={action.name} onSelect={this.onActionChange} eventKey={action.name} >{action.label}</MenuItem>);
      if ( action.name === this.state.name ) {
        title = action.label;
      }
    });
    return (
      <DropdownButton title={title}>
        { menuItems }
      </DropdownButton>
    );
  },

  getParamsChoosers: function () {
    let paramsTypes = {};
    let that = this;
    if ( this.state.name ) {
      paramsTypes = this.getParamsTypesFromName(this.state.name);
    }
    return Object.keys(paramsTypes).map((paramName) => {
      if ( paramsTypes[paramName] === 'numeric' || paramsTypes[paramName] === 'text' ) {
        return (
          <div style={{display: 'flex'}}>
            <span style={{marginLeft: 10, marginRight: 10}}><b>{paramName}:&nbsp;</b></span>
            <Input style={{width: 300}} type="text" value={this.state.params[paramName]} onChange={that.onParamChange.bind(that, paramName)} />
          </div>
        );
      }
    });
  },

  onActionChange: function (e, name) {
    e.preventDefault();
    this.setState({ name });
  },

  onParamChange: function (paramName, e) {
    e.preventDefault();
    let params = this.state.params;
    params[paramName] = e.target.value;
    this.setState({ params });
  },

  getDefaultProps: function () {
    return {
      action: {},
      actionTypes: [],
    };
  },

  getParamsTypesFromName: function (name) {
    let paramsTypes = {};
    this.props.actionTypes.forEach((action) => {
      if ( action.name === name ) {
        paramsTypes = action.params;
      }
    });
    return paramsTypes;
  },

  getInitialState: function () {
    let action = this.props.action.name ? this.props.action : {name: this.props.actionTypes[0].name, params: {}};
    return {
      name: action.name,
      params: action.params,
    };
  },

  getData: function () {
    return this.state;
  },
});

module.exports = Action;
