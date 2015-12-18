var Condition = require('./components/Condition');

var React = require('react');
var variables = [
  { "name": "expiration_days",
    "label": "Days until expiration",
    "field_type": "numeric",
    "options": []},
  { "name": "current_month",
    "label": "Current Month",
    "field_type": "string",
    "options": []},
  { "name": "goes_well_with",
    "label": "Goes Well With",
    "field_type": "select",
    "options": ["Eggnog", "Cookies", "Beef Jerkey"]}
];

var variable_type_operators = {
    "numeric": [ {"name": "equal_to",
                  "label": "Equal To",
                  "input_type": "numeric"},
                 {"name": "less_than",
                  "label": "Less Than",
                  "input_type": "numeric"},
                 {"name": "greater_than",
                  "label": "Greater Than",
                  "input_type": "numeric"}],
    "string": [ { "name": "equal_to",
                  "label": "Equal To",
                  "input_type": "text"},
                { "name": "non_empty",
                  "label": "Non Empty",
                  "input_type": "none"}],
    "select": [ { "name": "contains",
                  "label": "Contains",
                  "input_type": "select"},
                { "name": "does_not_contain",
                  "label": "Does Not Contain",
                  "input_type": "select"}]
};

var condition = {
  //name: 'goes_well_with',
  //operator: 'does_not_contain',
  //value: 'Cookies',
};

React.render(<Condition condition={condition} variables={variables} variable_type_operators={variable_type_operators} />, document.getElementById('example'));
