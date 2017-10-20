import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar () {

    return (
        <div>
            <div className="sidebar">

                <div id="sidebar-links">

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h2>HOME</h2>
                    </Link>

                    <div className="campus">
                    <Link to="/campuses" style={{ textDecoration: 'none' }}>
                        <h2>CAMPUSES</h2>
                    </Link>

                    <Link to="/create/campus" style={{ textDecoration: 'none' }}>
                        <h4>Add Campus</h4>
                    </Link>
                    </div>

                    <hr/>

                    <div className="student" >
                    <Link to="/students" style={{ textDecoration: 'none' }}>
                        <h2>STUDENTS</h2>
                    </Link>

                    <Link to="/create/student" style={{ textDecoration: 'none' }}>
                        <h4>Add Student</h4>
                    </Link>
                    </div>
                </div>

                <hr/>
            </div>
        </div>
    );
}

