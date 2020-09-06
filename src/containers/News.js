import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function News() {
    return (
        <div className='news'>
            <Card className='card-news'>
                <CardContent>
                    <rssapp-list id='uSg0L5yEGU2w63Sv'></rssapp-list>
                </CardContent>
            </Card>
            <Card className='card-news'>
                <CardContent>
                    <rssapp-list id='u7skoXUTLojl6F8o'></rssapp-list>
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
