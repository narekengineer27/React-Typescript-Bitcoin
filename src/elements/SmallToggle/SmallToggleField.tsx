import React = require("react");
import SmallToggle from "Elements/SmallToggle";
import { Field } from 'redux-form';

class SmallToggleField extends React.Component<any> {

    renderToggleField(props) {
      const { name, icons = false, label, input: { value, onChange }, disabled = false,
        labelClassName = '', leftChecked } = props;
      return (
          <SmallToggle
            name={name}
            checked={!!value}
            onClick={(event) => onChange(!!!value)}
            leftChecked={leftChecked}/>
      );
    }
  
    render() {
      const { isFormField = false } = this.props;
      return (
        <Field component={this.renderToggleField} {...this.props}/>
      )
    }
  }
  
  export default SmallToggleField;
  