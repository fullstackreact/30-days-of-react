import React, { PropTypes as T, Children as C } from 'react'
import classnames from 'classnames';
import moment from 'moment';

// import 'font-awesome/css/font-awesome.css'
import styles from './timeline.module.css'

export class Item extends React.Component {
  render() {
    const {time, content} = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.avatar}>
          <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
        </div>

        <span className={styles.time}>
          {time}
        </span>
        <p>{content}</p>
        <div className={styles.commentCount}>
          2
        </div>
      </div>
    )
  }
}

export class ActivityItem extends React.Component {
  render() {
    const {activity} = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.avatar}>
          <img src={activity.user.avatar} />
          {activity.user.name}
        </div>

        <span className={styles.time}>
          {activity.timestamp}
        </span>
        
        <p>{activity.text}</p>
        <div className={styles.commentCount}>
          {activity.comments.length}
        </div>
      </div>
    )
  }
}

export class SearchForm extends React.Component {
  static propTypes = {
    onSubmit: T.func.isRequired,
    searchVisible: T.bool
  }

  static defaultProps = {
    onSubmit: () => {},
    searchVisible: false
  }

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }

  submitForm(e) {
    e.preventDefault();

    const {searchText} = this.state;
    this.props.onSubmit(searchText);
  }

  render() {
    const {searchVisible, className} = this.props;

    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input
          type="search"
          className={classnames(styles.searchInput, {
            [styles.active]: searchVisible
          })}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..." />
      </form>
    );
  }
}

export class Header extends React.Component {
  static propTypes = {
    title: T.string,
    additionalClassesOn: T.bool,
    showIcons: T.bool,
    defaultSearchVisible: T.bool,
    onSearch: T.func
  }

  static defaultProps = {
    title: 'Timeline',
    additionalClassesOn: false,
    showIcons: true,
    defaultSearchVisible: false,
    onSearch: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      searchVisible: this.props.defaultSearchVisible,
      searchText: ''
    }
  }

  showSearchIcon() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }

  submitForm(val) {
    this.props.onSearch(val);
  }

  render() {
    const {title, additionalClassesOn, showIcons} = this.props;
    const {searchText} = this.state;

    return (
      <div className={classnames(styles.header, {
        'timelineHeading': additionalClassesOn
      })}>

        {showIcons && 
          <div className={classnames(styles.menuIcon, {
            'timelineMenuIcon': additionalClassesOn
          })}>
            <div className={styles.dashTop}></div>
            <div className={styles.dashBottom}></div>
            <div className={styles.circle}></div>
          </div>
        }

        <span className={classnames({
          'timelineTitle': additionalClassesOn
        }, styles.title)}>{title}</span>

        {showIcons && 
          <div>
            <SearchForm
              searchVisible={this.state.searchVisible}
              onSubmit={this.submitForm.bind(this)} />

            <div
              onClick={this.showSearchIcon.bind(this)}
              className={classnames("fa fa-search", {
                "timelineSearchIcon": additionalClassesOn
              }, styles.searchIcon)}></div>
          </div>
        }

      </div>
    )
  }
}

export class ContentContainer extends React.Component {
  render() {
    const {children, hideLine} = this.props;

    return (
      <div className={styles.content}>
        {!hideLine && <div className={styles.line}></div>}
        {C.map(children, c => c && React.cloneElement(c, {}))}
      </div>
    )
  }
}

export class Content extends React.Component {
  render() {
    return (
      <ContentContainer>
        <Item content="Ate lunch" time="10 am" />
        <Item content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." time="11:02 am" />
        <Item content="Lorem Ipsum is simply dummy text of the printing and typesetting industry." time="11:31 am" />
        <Item content="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." time="12 pm" />
      </ContentContainer>
    )
  }
}


export class Panel extends React.Component {
  render() {
    return (
      <div className={styles.notificationsFrame}>
        <div className={styles.panel}>
        {this.props.children}
        </div>
      </div>
    )
  }
}

const identity = () => Promise.resolve({});

export class GithubActivityItem extends React.Component {
  render() {
    const {activity} = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.avatar}>
          <img src={activity.actor.avatar_url} />
          {activity.actor.display_login}
        </div>

        <span className={styles.time}>
          {moment(activity.created_at).fromNow()}
        </span>
        
        <p>{activity.actor.display_login} {activity.payload.action}</p>
        <div className={styles.right}>
          {activity.repo.name}
        </div>
      </div>
    )
  }
}

export class AsyncContent extends React.Component {
  static defaultProps = {
    loading: false,
    fetchData: identity
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      activities: []
    }
  }

  componentWillMount() {
    this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  updateData() {
    this.props.fetchData()
      .then(json => {
        this.setState({loading: false, activities: json})
      })
      .then(() => {
        if (this.props.onComponentRefresh) {
          this.props.onComponentRefresh();
        }
      })
  }

  handleSearch(val) {
    console.log('handleSearch called in AsyncContent', val);
  }

  render() {
    const {loading, activities} = this.state;
    return (
      <ContentContainer 
        hideLine={activities.length === 0}
        onSearch={this.handleSearch.bind(this)}>
        {loading && <div>Loading</div>}
        {!loading && activities.length === 0 && <div>There is nothing here</div>}
        {activities.map(activity => {
          return (
            <GithubActivityItem
              key={activity.id}
              activity={activity} />
          )
        })}
      </ContentContainer>
    )
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel;