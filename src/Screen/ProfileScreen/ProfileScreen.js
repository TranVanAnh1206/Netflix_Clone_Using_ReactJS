import React from 'react';
import { NavLink } from 'react-router-dom';

import './ProfileScreen.css';
import Nav from '../../Nav/Nav';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';

const produces = [
    {
        id: 'prod_1',
        name: 'Premium',
        desc: '4K + HDR',
        price: 299000,
        active: true,
    },
    {
        id: 'prod_2',
        name: 'Basic',
        desc: '720p',
        price: 'free',
        active: false,
    },
    {
        id: 'prod_3',
        name: 'Standard',
        desc: '1080p',
        price: 1990000,
        active: false,
    },
];

function ProfileScreen() {
    const user = useSelector(selectUser);

    const handleClickNavlink = (e) => {
        e.preventDefault();
    };

    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1 className="profileScreen__title">Your profile</h1>
                <div className="profileScreen__info">
                    <img
                        className="profileScreen__userLogo"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Netflix User Avatar"
                    />
                    <div className="profileScreen__details">
                        <h2 className="profileScreen__userEmail">{user.email}</h2>
                        <h3 className="profileScreen__plan">Plan (Current package: Premium)</h3>
                        <div className="profileScreen__infoPackage">
                            <p>Renewal date: 12/06/2003</p>
                            {produces.map((produce) => {
                                return (
                                    <React.Fragment>
                                        <div key={produce.id} className="package">
                                            <div className="package__info">
                                                <h3 className="package__name">{produce.name}</h3>
                                                <h4 className="package__desc">{produce.desc}</h4>
                                            </div>
                                            <NavLink
                                                className={produce.active ? 'active__btn' : ''}
                                                onClick={
                                                    produce.active ? () => handleClickNavlink : console.log('clicked')
                                                }
                                                to="/paymentScreen"
                                            >
                                                {produce.active ? 'Current package' : 'Subcribe'}
                                            </NavLink>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <button onClick={() => auth.signOut()} className="profileScreen__signOutBtn netflix__btn">
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
