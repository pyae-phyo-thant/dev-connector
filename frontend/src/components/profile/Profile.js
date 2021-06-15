import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileGithub from "./ProfileGithub";
import Moment from "react-moment";
import NotFound from "../layout/NotFound";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            {/* Top */}
            <div className="profile-top bg-primary p-2">
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
              <h1 className="large">{profile.user.name}</h1>
              <p className="lead">
                {profile.status} at{" "}
                {profile.company && <span>{profile.company}</span>}
              </p>
              <p>{profile.location && <span>{profile.location}</span>}</p>
              <div className="icons my-1">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.facebook && (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.youtube && (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.instagram && (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </div>
            </div>

            {/* About */}
            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">
                {profile.user.name === undefined
                  ? " "
                  : profile.user.name.trim().split(" ")[0]}{" "}
                Bio
              </h2>
              <p>{profile.bio}</p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fa fa-check"></i> {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <div key={exp._id}>
                      <h3 className="text-dark">{exp.company}</h3>
                      <p>
                        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                        {!exp.to ? (
                          "Now"
                        ) : (
                          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                        )}
                      </p>
                      <p>
                        <strong>Position: </strong>
                        {exp.title}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h4>No experience added.</h4>
              )}
            </div>

            {/* Education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <div key={edu._id}>
                      <h3 className="text-dark">{edu.school}</h3>
                      <p>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                        {!edu.to ? (
                          "Now"
                        ) : (
                          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                        )}
                      </p>
                      <p>
                        <strong>Degree: </strong>
                        {edu.degree}
                      </p>
                      <p>
                        <strong>Field Of Study: </strong>
                        {edu.fieldofstudy}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h4>No education added.</h4>
              )}
            </div>
            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
              {profile.githubusername ? <p>no Github username added</p> : ""}
              {profile.githubusername && (
                <ProfileGithub
                  key={profile._id}
                  username={profile.githubusername}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
