var React = require('react');
var Styles = require('../styles/Styles');

var Action = React.createClass({
  render: function () {
    let actionChooser = this.getActionChooser();
    let paramsChoosers = this.getParamsChoosers();
    return (
      <div className="action-row">
        { actionChooser }
        { paramsChoosers }
      </div>
    );
  },

  getActionChooser: function () {
    return (
      <select style={Styles.select} value={this.state.name} onChange={this.onActionChange} className="action-name">
        {
          this.props.actionTypes.map((action) => {
            return <option key={action.name} value={action.name}>{action.label}</option>;
          })
        }
      </select>
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
        return <label>{paramName}: <input value={this.state.params[paramName]} onChange={that.onParamChange.bind(that, paramName)}/></label>;
      }
    });
  },

  onActionChange: function (e) {
    e.preventDefault();
    let name = e.target.value;
    this.setState({ name });
  },

  onParamChange: function (paramName, e) {
    e.preventDefault();
    let params = this.state.params;
    params[paramName] = e.target.value;
    this.setState({ params });
  },

  getDefaultProps: function () {
    return {action: {}};
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
});

module.exports = Action;
