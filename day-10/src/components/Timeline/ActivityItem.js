import React from 'react'
import './Timeline.css'

export class ActivityItem extends React.Component {
  render() {
    const { activity } = this.props;

    return (
      <div className='item'>
        <div className='avatar'>
          <img
          alt='avatar'
          src={activity.user.avatar} />
          {activity.user.name}
        </div>

        <span className='time'>
          {activity.timestamp}
        </span>
        
        <p>{activity.text}</p>
        <div className='commentCount'>
          {activity.comments.length}
        </div>
      </div>
    )
  }
}

export default ActivityItem