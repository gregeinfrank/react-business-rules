var SubCondition = require('./SubCondition');
var React = require('react');

var ConditionsBuilder = React.createClass({
  render: function () {
    let subConditionProps = {
      variables: this.props.variables,
      variable_type_operators: this.props.variable_type_operators,
    };
    return (
      <div className="conditions-builder">
        {
          this.props.conditionsData.any ?
            <SubCondition ref="rootCondition" logicalOperator="any" conditions={this.props.conditionsData.any} {...subConditionProps} /> :
            <SubCondition ref="rootCondition" logicalOperator="all" conditions={this.props.conditionsData.all} {...subConditionProps} />
        }
      </div>
    );
  },

  getDefaultProps: function () {
    return {
      variables: [],
      variable_type_operators: {},
      conditionsData: {},
    };
  },

  getData: function () {
    return this.refs.rootCondition.getData();
  },
});

module.exports = ConditionsBuilder;
