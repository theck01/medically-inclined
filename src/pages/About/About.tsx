import React from 'react';

import Text from 'components/Text';
import aboutGif from 'data/img/about.gif';

import styles from './About.module.scss';

export const About: React.FC = () => (
  <div className={styles['about-container']}>
    <div>
      <Text>
        Hi! My name is Caroline. I am a third year medical student, a wife, a
        dog mom, a brain surgery survivor, and apparently a bit of an artist.
      </Text>
      <Text>
        These illustrations have been a great way for me to teach myself and 
        remember important concepts. I hope these are as helpful to you as they
        have been for me.
      </Text>
      <Text>
        Follow me on Instagram <a href="https://www.instagram.com/themedicallyinclined/?themedicallyinclined">@themedicallyinclined</a> for
        updates on recent illustration posts and edits!
      </Text>
    </div>
    <img src={aboutGif} alt="Medical student waving hello" />
  </div>
);

export default About;
