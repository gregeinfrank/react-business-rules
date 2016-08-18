var ActionsBuilder = require('./components/ActionsBuilder');
var ConditionsBuilder = require('./components/ConditionsBuilder');
var BusinessRules = require('./components/BusinessRules');

var React = require('react');

var variables = [
  { "name": "num_received_invite_reminders",
    "label": "Number of Invite Reminders Received",
    "field_type": "numeric",
    "options": []},
  { "name": "identity_status",
    "label": "Identity Status",
    "field_type": "string",
    "options": []},
  { "name": "days_since_invited",
    "label": "Days since invited",
    "field_type": "numeric",
    "options": []}
];

var actionTypes = [
  { "name": "send_email",
    "label": "Send Email to Identity",
    "params": {"email_template": "text"}},
  { "name": "send_app_message",
    "label": "Send Message to Identity",
    "params": {"message_text": "text"}}
];

//var variables = [
//  { "name": "expiration_days",
//    "label": "Days until expiration",
//    "field_type": "numeric",
//    "options": []},
//  { "name": "current_month",
//    "label": "Current Month",
//    "field_type": "string",
//    "options": []},
//  { "name": "goes_well_with",
//    "label": "Goes Well With",
//    "field_type": "select",
//    "options": ["Eggnog", "Cookies", "Beef Jerkey"]}
//];

//var actionTypes = [
//  { "name": "put_on_sale",
//    "label": "Put On Sale",
//    "params": {"sale_percentage": "numeric"}},
//  { "name": "order_more",
//    "label": "Order More",
//    "params": {"number_to_order": "numeric"}}
//];
//

/*
 * days_since_invited > 5 && num_invites_sent == 0 && (status == "invited" || status == "blank")
 *
 */

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
                { "name": "is_blank",
                  "label": "Is Blank",
                  "input_type": "none"},
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
  name: 'goes_well_with',
  operator: 'does_not_contain',
  value: 'Cookies',
};
var action = {
  name: 'order_more',
  params: {
    number_to_order: '5'
  }
}

var conditionsData = {"all":[{"name":"expiration_days","operator":"equal_to","value":4},{"name":"goes_well_with","operator":"contains","value":"Cookies"},{"any":[{"name":"current_month","operator":"equal_to","value":"February"},{"name":"expiration_days","operator":"equal_to","value":2}]}]};
conditionsData = {};

//React.render(<Condition condition={condition} variables={variables} variable_type_operators={variable_type_operators} />, document.getElementById('example'));
//React.render(<ConditionsBuilder variables={variables} variable_type_operators={variable_type_operators} conditionsData={conditionsData} />, document.getElementById('example-conditions'));
//React.render(<ActionsBuilder actionTypes={actionTypes} actions={[action]} />, document.getElementById('example-actions'));
React.render(<BusinessRules actionTypes={actionTypes} actions={[]} variables={variables} variable_type_operators={variable_type_operators} conditionsData={conditionsData} />, document.getElementById('example'));
