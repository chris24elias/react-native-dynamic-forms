DynamicForms is powered by React Native UI Kitten
https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten

Follow instructions on their website to set up your application with UI Kitten.

## Configure Application Root

#### Wrap the root component of your App into ApplicationProvider component. In your App.js:

```

import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import {mapping, light} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <IconRegistry icons={EvaIconsPack} />
        {/* YOUR CODE */}
    </ApplicationProvider>
);

export default App;

```
