import { createContext, useEffect, useState } from "react";
import axios from "axios";
import mockRepos from "./mockData/mockRepos";
import mockUser from "./mockData/mockUser";
import MockFollower from "./mockData/mockFollower";

const ROOT_URL = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(MockFollower);

    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });

    const searchGithubUser = async(user) => {
        showError();
        setIsLoading(true);
        try {
        const response = await axios(`${ROOT_URL}/users/${user}`);
         if (response) {
            setIsLoading(false);
            setGithubUser(response.data);
            const { login, followers_url } = response.data;

            await Promise.allSettled([axios(`${ROOT_URL}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)]).then((results) => {
                const [repos, followers] = results;
                const status = 'fulfilled';
                if (repos.status === status) {
                    setRepos(repos.value.data);
                }
                if (followers.status === status) {
                    setFollowers(followers.value.data);
                }
            })
         } else {
            showError(true, 'there is no user with that username');
         }
        } catch (err) {
            setIsLoading(false);
            showError(true, err.response.data.message);
        }
    };

    const checkRequest = () => {
        axios(`${ROOT_URL}/rate_limit`)
            .then(({ data }) => {
                let { rate: {remaining}, } = data;
                setRequests(remaining);
                if (remaining === 0) {
                    showError(true, 'sorry, you have exeeded your hourly rate limit');
                }
            }).catch(err => console.log(err));
    }

    function showError(show = false, msg = '') {
        setError({ show, msg });
    }
    useEffect(() => {
        checkRequest();
    }, [])
    return <GithubContext.Provider value={{ githubUser, repos, followers, requests, error, searchGithubUser, isLoading }}>
        {children}
    </GithubContext.Provider>
}

export { GithubContext, GithubProvider };