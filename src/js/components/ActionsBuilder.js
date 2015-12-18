var Button = require('react-bootstrap').Button;
var Action = require('./Action');
var Styles = require('../styles/Styles');
var React = require('react');

var ActionsBuilder = React.createClass({
  render: function () {
    return (
      <div className="actions-builder">
        {
          this.state.actions.map((action, index) => {
            return (
              <div key={action.id} style={{display: 'flex'}}>
                <Action ref={action.id} actionTypes={this.props.actionTypes} action={action} />
                <Button style={{margin: 5, marginBottom: 'auto'}} bsStyle="danger" bsSize="xsmall" onClick={this.removeAction.bind(this, action.id)}>remove</Button>
              </div>
            );
          })
        }
        <Button
          bsSize="xsmall"
          className="add-action"
          onClick={this.addAction}>
          Add Action
        </Button>
      </div>
    );
  },

  getInitialState: function () {
    let actions = this.props.actions;
    let id = 0;
    actions.forEach((action) => {
      action.id = id;
      id += 1;
    });
    return { actions, id };
  },

  addAction: function () {
    let actions = this.state.actions;
    actions.push({id: this.state.id});
    this.setState({ actions, id: this.state.id + 1 });
  },

  removeAction: function (id) {
    let actions = this.state.actions.filter((action) => action.id !== id);
    this.setState({ actions });
  },

  getDefaultProps: function () {
    return {
      actionTypes: [],
      actions: [],
    };
  },

  getData: function () {
    return Object.keys(this.refs).map((ref) => {
      return this.refs[ref].getData();
    });
  },
});

module.exports = ActionsBuilder;
