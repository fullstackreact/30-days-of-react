const evts = [
  'MouseMove', 'MouseUp', 'MouseDown', 'Click', 'DoubleClick',
  'MouseLeave', 
  'TouchStart', 'TouchEnd'
];

export class InteractionEventBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = evts.reduce((sum, e) => ({
      ...sum,
      [e]: false
    }), {});
  }

  onEvent(name, evt) {
    this.setState({ [name]: true });
  }

  reset(name) {
    this.setState({ [name]: false });
  }

  render() {
    return (
      <div className="eventContainer">
        <ul>
        {evts.map(e => {
          const triggered = this.state[e];
          const props = {
            [`on${e}`]: this.onEvent.bind(this, e)
          }
          return (
            <li className="eventListing" key={e}>
              <div 
                className="reset"
                onClick={this.reset.bind(this, e)}>
                  <i className="fa fa-refresh" />
              </div>
                
                <div className="name" {...props}>
                  {`on${e}`}
                </div>

                <div className="trigger">
                  <i className={classnames("fa", {
                    "fa-square": triggered,
                    "fa-square-o": !triggered
                  })} />
                </div>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}