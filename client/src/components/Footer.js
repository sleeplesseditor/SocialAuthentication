import React from 'react';
import FontAwesome from 'react-fontawesome';

const Footer = () => {
    return (
        <footer>
            <a
                href="https://medium.com/p/862d59583105"
                title="Medium Tutorial Article"
                className={'small-button medium'}
            >
                <FontAwesome 
                    name={'medium'}
                />
            </a>
            <a
                href="https://github.com/funador/react-auth-client"
                title="GitHub Repo"
                className={'small-button github'}
            >
                <FontAwesome 
                    name={'github'}
                />
            </a>
        </footer>
    )
}

export default Footer;