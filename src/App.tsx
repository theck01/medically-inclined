import React from 'react';

import Button from 'components/Button';
import Text from 'components/Text';
import PageLayout from 'layout/PageLayout';

function App() {
  return (
    <PageLayout>
      <Text size="h1">Page body</Text>
      <Button label="Test" icon="search" variant="minimal" click={() => { console.log('clicked') }}/>
    </PageLayout>
  );
}

export default App;
