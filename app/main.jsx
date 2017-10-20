'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Route, HashRouter as Router} from 'react-router-dom';

import Sidebar from './components/Sidebar';

import HomePage from './components/HomePage';

import Campuses from './components/Campuses';
import SingleCampus from './components/SingleCampus';
import AddNewCampus from './components/AddNewCampus';
import EditCampus from './components/EditCampus';

import Students from './components/Students';
import SingleStudent from './components/SingleStudent';
import AddNewStudent from './components/AddNewStudent';
import EditStudent from './components/EditStudent';

render(
    <Router>
        <div>
            <Sidebar />
            <div id="content">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/campuses" component={Campuses} />
                <Route exact path="/campuses/:campusId" component={SingleCampus} />
                <Route path="/create/campus" component={AddNewCampus} />
                <Route path="/campuses/edit/:campusId" component={EditCampus} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/students/:studentId" component={SingleStudent} />
                <Route path="/create/student" component={AddNewStudent} />
                <Route path="/students/edit/:studentId" component={EditStudent} />
            </div>
        </div>
    </Router>,
    document.getElementById('main')
);















