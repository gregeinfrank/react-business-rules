var ConditionsBuilder = require('./ConditionsBuilder');
var ActionsBuilder = require('./ActionsBuilder');
var React = require('react');

var BusinessRules = React.createClass({
  render: function () {
    return (
      <div style={{padding: 40}} className="business-rules">
        <h2>When these conditions are met...</h2>
        <ConditionsBuilder ref="conditionsBuilder" conditionsData={this.props.conditionsData} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} />
        <h2>Run these actions:</h2>
        <ActionsBuilder ref="actionsBuilder" actions={this.props.actions} actionTypes={this.props.actionTypes} />
        <button className="btn btn-default" style={{marginTop: 30}} onClick={this.fakeSubmit}>Fake Submit (print to console)</button>
      </div>
    );
  },

  fakeSubmit: function () {
    let conditionsData = this.refs.conditionsBuilder.getData();
    console.log("CONDITIONS");
    console.log(JSON.stringify(conditionsData));
    let actionsData = this.refs.actionsBuilder.getData();
    console.log("ACTIONS");
    console.log(JSON.stringify(actionsData));
  },

  getDefaultProps: function () {
    return {
      actionTypes: [],
      actions: [],
      conditionsData: {},
      variables: [],
      variable_type_operators: {},
    };
  },
});

module.exports = BusinessRules;
