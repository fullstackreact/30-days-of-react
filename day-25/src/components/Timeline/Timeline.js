import React from "react";

import Header from "./Header";
import ActivityItem from "./ActivityItem";
import "./Timeline.css";

// Could be fetched from a server
const activities = require("../../data.json");

// Don't do it like this. This is for example only
class Timeline extends React.Component {
  render() {
    return (
      <div className="notificationsFrame">
        <div className="panel">
          <Header title="Timeline" />
          <div className="content">
            <div className="line"></div>

            {activities &&
              activities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
