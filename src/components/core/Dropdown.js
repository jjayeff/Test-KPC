import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownExampleSearchSelection = props => {
  return (
    <Dropdown
      placeholder="Select Country"
      fluid
      selection
      {...props.input}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      options={props.option}
    />
  );
};

export default DropdownExampleSearchSelection;
