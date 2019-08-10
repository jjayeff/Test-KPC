import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class renderDatePicker extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }).isRequired,
    inputValueFormat: PropTypes.string
  };

  static defaultProps = {
    inputValueFormat: null
  };

  state = {
    selectedDate: new Date()
  };

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui left pointing red basic label">{error}</div>;
  }

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(
          this.props.input.value,
          this.props.inputValueFormat
        )
      });
    }
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.stateValue !== this.props.stateValue &&
      this.props.stateValue
    ) {
      this.setState({
        selectedDate: this.props.stateValue
      });
    }
  }

  handleChange = date => {
    this.setState({
      selectedDate: date
    });

    this.props.input.onChange(date);
  };

  render() {
    const { meta, label, request, ...rest } = this.props;
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className="inline fields" style={{ marginLeft: '10px' }}>
        <label>
          {label}
          <span style={{ color: 'red' }}>{request ? '*' : ''}</span>
        </label>
        <div className={className}>
          <DatePicker
            {...rest}
            selected={this.state.selectedDate}
            onChange={this.handleChange}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            timeIntervals={1}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        {this.renderError(meta)}
      </div>
    );
  }
}
