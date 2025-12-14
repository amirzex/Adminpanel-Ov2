import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@components/avatar";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import { User, Settings, Power } from "react-feather";
import { GetProfileInfo } from "../../../service/api/Dashboard/GetApi";
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const UserDropdown = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await GetProfileInfo();
      if (!data) return;

      const avatar =
        data?.userPicture?.[0]?.puctureAddress ||
        data?.userImage?.[0]?.puctureAddress ||
        data?.currentPictureAddress ||
        defaultAvatar;

      setUser({
        fullName: `${data.fName} ${data.lName}`,
        avatar,
      });
    };

    loadProfile();
  }, []);

  if (!user) return null;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        tag="a"
        href="/"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{user.fullName}</span>
          <span className="user-status">دانشجو</span>
        </div>

        <Avatar
          img={user.avatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>

      <DropdownMenu end>
        <DropdownItem tag={Link} to="/userpanel/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل</span>
        </DropdownItem>

        <DropdownItem tag={Link} to="/userpanel/settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">تنظیمات</span>
        </DropdownItem>

        <DropdownItem divider />

        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => localStorage.clear()}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
