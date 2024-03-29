import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary profileabout">
          {name.trim().split(" ")[0]}'s Bio
        </h2>
        <p className="profileabout">{bio}</p>
        <div className="line profileabout"></div>
      </Fragment>
    )}
    <h2 className="text-primary profileabout">Skill Set</h2>
    <div className="skills  profileabout__bio">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fa fa-check"></i> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
