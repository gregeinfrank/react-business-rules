var ConditionsBuilder = require('./ConditionsBuilder');
var ActionsBuilder = require('./ActionsBuilder');
var React = require('react');

var BusinessRules = React.createClass({
  render: function () {
    return (
      <div className="business-rules">
        <ConditionsBuilder ref="conditionsBuilder" conditionsData={this.props.conditionsData} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} />
        <ActionsBuilder ref="actionsBuilder" actions={this.props.actions} actionTypes={this.props.actionTypes} />
        <button onClick={this.fakeSubmit}>Fake Submit (print to console)</button>
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
