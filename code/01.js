import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames';
import moment from 'moment';

import ReactDataGrid from 'react-data-grid';

import 'font-awesome/css/font-awesome.css'
import './30-days.css';
import styles from './30-days.module.css';

const demoHelper = (fn, nodeId, mountOpts) => {
  mountOpts = mountOpts || {};

  const node = document.querySelector(nodeId);
  const DemoComponent = fn;

  mountOpts.className = [styles.allDemos]
    .concat([mountOpts.className]).join(' ')

  const containerClasses = classnames(styles.demoContainer, mountOpts.containerClassName)

  const Component = (props) => {
    const componentProps = Object.assign({}, props, {
      name: null
    })
    const containerProps = Object.assign({}, {
      className: containerClasses
    }, mountOpts.container);

    return (
      <div {...containerProps}>
        <h4>Demo</h4>
        <DemoComponent {...componentProps} />
      </div>
    )
  }

  ReactDOM.render(<Component
                  containerStyle={{position: 'relative', height: '250px'}}
                  {...mountOpts}
                  />, node);
}

export const load = function(err, cb) {
  demoHelper(React.createClass({
    render: function() {
      return (<h1>Hello world</h1>);
    }
  }), '#demo1', {});

  // Currently not implemented
  const createData = (count) => {
    const columns = [
      {key:'date',  name: 'Date'}, 
      {key:'num',   name: 'Number of visitors', editable: true}
    ];
    let initialDate = moment(new Date());
    let rows = [];
    for (var n = count; n >= 0; n--) {
      let newDate = initialDate.subtract(1, 'day');
      let formatted = newDate.format('YYYY-MM-DD');
      let newRow = {
        id: n,
        date: formatted,
        num: Math.floor(Math.random(100) * 100)
      }
      rows.push(newRow);
    };

    return {columns, rows};
  };

  const computeRunningTotal = (rows, fromIdx) => {
    let newData = rows;
    const total = rows.length - 1;
    let currTotal = 0;
    for (let i = fromIdx; i < total - fromIdx; i++) {
      const datum = rows[i];
      currTotal = currTotal + dataNum;
      newData[i].num = currTotal;
    }
    return newData;
  }

  class SpreadSheetDemo extends React.Component {
    static defaultProps = {
      countSize: 10,
    }
    constructor(props) {
      super(props);

      const data = createData(this.props.countSize);
      this.state = data;
    }

    rowGetter(rowIdx) {
      const {rows} = this.state;
      return rows[rowIdx];
    }

    _handleRowUpdate(e) {
      const {rows} = this.state;
      const row = rows[e.rowIdx];
      let newRow = Object.assign({}, row, {num: parseFloat(e.updated.num)});
      rows[e.rowIdx] = newRow;
      const newRows = computeRunningTotal(rows, e.rowIdx);
      this.setState({rows: newRows});
    }

    render() {
      const {countSize, spreadsheetId} = this.props;
      const {rows, columns} = this.state;

      return (
        <div className="spreadsheet">
          <ReactDataGrid
            enableCellSelect={true}
            onRowUpdated={this._handleRowUpdate.bind(this)}
            rowGetter={this.rowGetter.bind(this)}
            rowsCount={rows.length}
            columns={columns}
            />
        </div>
      )
    }
  }

  // demoHelper(SpreadSheetDemo, '#spreadSheet1', {className: "spreadsheet"});
}

export default load