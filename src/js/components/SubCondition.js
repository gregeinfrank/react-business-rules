var Condition = require('./Condition');
var Styles = require('../styles/Styles');
var React = require('react');

var SubCondition = React.createClass({
  render: function () {
    return (
      <div style={Styles.subCondition} className="conditions-builder">
        <select style={Styles.select} value={this.state.logicalOperator} onChange={this.onLogicalOperatorChange} className="sub-condition-logical-operator">
          <option value="all">All</option>
          <option value="any">Any</option>
        </select>
        {
          this.state.conditions.map((condition, index) => {
            if ( condition.all !== undefined ) {
              return <SubCondition ref={condition.id} logicalOperator="all" conditions={condition.all} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} />;
            } else if ( condition.any !== undefined ) {
              return <SubCondition ref={condition.id} logicalOperator="any" conditions={condition.any} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} />;
            } else {
              return (
                <div key={condition.id} style={{display: 'flex'}}>
                  <Condition ref={condition.id} variables={this.props.variables} variable_type_operators={this.props.variable_type_operators} condition={condition} />
                  <span style={Styles.removeButton} className="remove-condition" onClick={this.removeCondition.bind(this, condition.id)} >x</span>
                </div>
              );
            }
          })
        }
        <button className="add-condition" onClick={this.addCondition} >Add Condition</button>
        <button className="add-sub-condition" onClick={this.addSubCondition} >Add Sub Condition</button>
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
    return { conditions, id, logicalOperator: this.props.logicalOperator };
  },

  addCondition: function () {
    let conditions = this.state.conditions;
    conditions.push({id: this.state.id});
    this.setState({ conditions, id: this.state.id + 1 });
  },

  addSubCondition: function () {
    let conditions = this.state.conditions;
    conditions.push({all: [], id: this.state.id});
    this.setState({ conditions, id: this.state.id + 1 });
  },

  onLogicalOperatorChange: function (e) {
    e.preventDefault();
    this.setState({logicalOperator: e.target.value});
  },

  removeCondition: function (id) {
    let conditions = this.state.conditions.filter((condition) => condition.id !== id);
    this.setState({ conditions });
  },

  getDefaultProps: function () {
    return {
      logicalOperator: 'all',
      variables: [],
      variable_type_operators: {},
      conditions: [],
    };
  },

  getData: function () {
    return {
      [this.state.logicalOperator]: Object.keys(this.refs).map((ref) => {
        return this.refs[ref].getData();
      })
    };
  },
});

module.exports = SubCondition;
