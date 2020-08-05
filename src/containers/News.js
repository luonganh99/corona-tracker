import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function News() {
    return (
        <div className='news'>
            <Card className='card-news'>
                <CardContent>
                    <rssapp-list id='l55RUj077gCglvef'></rssapp-list>
                </CardContent>
            </Card>
            <Card className='card-news'>
                <CardContent>
                    <rssapp-list id='Duo1A3ixtji5pGB4'></rssapp-list>
                </CardContent>
            </Card>
            <Card className='card-news'>
                <CardContent>
                    <a class='twitter-timeline' href='https://twitter.com/WHO?ref_src=twsrc%5Etfw'>
                        Tweets by WHO
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}

export default News;
