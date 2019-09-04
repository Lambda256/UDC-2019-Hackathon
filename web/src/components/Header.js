import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Button } from "antd";
import AuthContext from "contexts/AuthContext";
import logoGrey from "assets/images/logo-grey.svg";
import userFace from "assets/images/user-face.svg";

const Header = props => {
  const { user } = useContext(AuthContext);
  const tokenPage =
    props.history.location.pathname.includes("/token") ||
    props.history.location.pathname.indexOf("/wallet") > -1;
  const hideJoin = props.history.location.pathname.includes("/transactions");
  return (
    <div className={`header ${tokenPage && "fullscreen"}`}>
      <Link to="/">
        <img src={logoGrey} alt="" />
      </Link>
      {!hideJoin && (
        <>
          {user ? (
            <div className="row-align-center">
              <Link to="/wallet">
                <div className="header-name row-align-center hover-link">
                  <img src={user.profile_picture || userFace} alt="" />
                  <div className="text-grey uppercase">{user.name}</div>
                </div>
              </Link>

              <Link to="/create">
                <Icon
                  type="plus-square"
                  className="text-grey hover-link"
                  style={{ marginLeft: 16, fontSize: 20 }}
                />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button>JOIN</Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
