import React from 'react'
import './css/index.css'
import Home from './components/home/Home'
import SinglePost from './components/post/SinglePost'
import { Router, Route, Switch } from 'react-router'
import Header from './components/common/Header'
import Categories from './components/common/Categories'
import TopTags from './components/common/TopTags'
import Footer from './components/common/Footer'
import { history } from './utils/router'

const App = () => {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="main-container">
                    <Router history={history}>
                        <Switch>
                            <Route path="/post/:postId/:postSlug">
                                <SinglePost />
                            </Route>
                            <Route path="/:type/:subType">
                                <Home />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <div className="side-container">
                    <div className="categories-container">
                        <h2> Categories </h2>
                        <Categories/>
                    </div>
                    <div className="top-tags-container">
                        <h2> Top Tags </h2>
                        <TopTags/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default App

