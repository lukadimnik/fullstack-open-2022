import { connect, useSelector } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector((state) => state.notifications);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (!props.notification) {
    return null;
  }
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  };
};

export default connect(mapStateToProps, null)(Notification);
