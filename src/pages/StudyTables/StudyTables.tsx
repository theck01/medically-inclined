import React from 'react';

import Link from 'components/Link';
import Text from 'components/Text';

import pdfImg from 'data/img/pdf.webp';

import styles from './StudyTables.module.scss';

export const StudyTables: React.FC = () => (
  <div>
    <Text size="h3">Study Tables</Text>
    <Text>
      The following pdfs are a compilation of tables I have made throughout the
      first two years of medical school and in preparation for boards. They are
      organized by system, with the highest yield text bolded and highlighted in
      red. Information highlighted in blue is particularly pertinent for boards.
    </Text>
    <Text>
      Similar to my illustrations, these are free to download for your own
      study. However, if you would like to show your appreciation, please donate
      to Heart of Dinner, a non-profit that I truly believe in.
    </Text>
    <Text>
      <i>"Founded at the onset of COVID-19, Heart of Dinner works to fight food insecurity and isolation experienced by Asian American seniors -- two long-standing community issues heightened by the pandemic. They now serve 1,500+ elders in Lower Manhattan, Brooklyn and Queens, delivering weekly hot lunches, fresh produce and bulk ingredients while supporting local small businesses during their COVID-related recovery process."</i>
    </Text>
    <div className={styles['donate-button-container']}>
      <Link path="https://www.heartofdinner.org/donate" variant="button" external >
        Donate Now &gt;
      </Link>
    </div>
    <Text spacing="6x">
      -- Thank you for your support! 
    </Text>

    <div className={styles['pdf-container']}>
      <div className={styles['pdf-file']}>
        <img src={pdfImg} alt="Download PDF file" />
        <Text size="lg">
          Pharmacology
        </Text>
      </div>
      <div className={styles['pdf-file']}>
        <img src={pdfImg} alt="Download PDF file" />
        <Text size="lg">
          Pathology
        </Text>
      </div>
      <div className={styles['pdf-file']}>
        <img src={pdfImg} alt="Download PDF file" />
        <Text size="lg">
          Microbiology
        </Text>
      </div>
    </div>
  </div>
);

export default StudyTables;
