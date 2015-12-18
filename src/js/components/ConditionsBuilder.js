var Condition = require('./Condition');
var React = require('react');

var ConditionsBuilder = React.createClass({
  render: function () {
    return (
      <div className="conditions-builder">
        {
          this.state.conditions.map((condition, index) => {
            return (
              <div key={condition.id} style={{display: 'flex'}}>
                <Condition ref={condition.id} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} condition={condition} />
                <button className="remove-condition" onClick={this.removeCondition.bind(this, condition.id)} >Remove Condition</button>
              </div>
            );
          })
        }
        <button className="add-condition" onClick={this.addCondition} >Add Condition</button>
      </div>
    );
  },

  getInitialState: function () {
    let conditions = this.props.conditions;
    let id = 0;
    conditions.forEach((condition) => {
      condition.id = id;
      id += 1;
    });
    return { conditions, id };
  },

  addCondition: function () {
    let conditions = this.state.conditions;
    conditions.push({id: this.state.id});
    this.setState({ conditions, id: this.state.id + 1 });
  },

  removeCondition: function (id) {
    let conditions = this.state.conditions.filter((condition) => condition.id !== id);
    this.setState({ conditions });
  },

  getDefaultProps: function () {
    return {
      variables: [],
      variable_type_operators: {},
      conditions: [],
    };
  },
});

module.exports = ConditionsBuilder;
