// Don't do it like this. This is for example only
class Panel extends React.Component {
  render() {
    return (
      <div className="notificationsFrame">
        <div className="panel">
          <div className="header">
            
            <div className="menuIcon">
              <div className="dashTop"></div>
              <div className="dashBottom"></div>
              <div className="circle"></div>
            </div>

            <span className="title">Timeline</span>

            <input
              type="text"
              className="searchInput"
              placeholder="Search ..." />

            <div className="fa fa-search searchIcon"></div>
          </div>
          <div className="content">
            <div className="line"></div>
            <div className="item">

              <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
                Doug
              </div>

              <span className="time">
                An hour ago
              </span>
              <p>Ate lunch</p>
            </div>

            <div className="item">
              <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
              </div>

              <span className="time">10 am</span>
              <p>Read Day two article</p>
            </div>

            <div className="item">
              <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
              </div>

              <span className="time">10 am</span>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>

            <div className="item">
              <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
              </div>

              <span className="time">2:21 pm</span>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}