import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ 
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    } 
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="avatar" className="round-img" />
            <div>
                <h2 className="profile__name">{name}</h2>
                <p className="profile__company">{status} {company && <span> at {company}</span>}</p>
                <p className="my-1 profile__location">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {/* just show max 4 skills */}
                {skills.slice(0,4).map((skill, index) => (
                    <li key={index} className="text-primary profileitem__skill">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
