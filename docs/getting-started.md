### Installing

To install Bifrost, simply run:

**yarn**
```bash
yarn install --save dm-react-bifrost
```
**npm**
```bash
npm install --save dm-react-bifrost
```

### Usage

To setup Bifrost you simply need to render the Bifrost container at the root of your React application.

```jsx
import {BifrostContainer} from 'dm-react-bifrost';

const App = () => {
  return <BifrostContainer config={config} />;
};
```

#### Phaser Setup

If you haven't already, you need to render your React app in your Phaser game.
In your entry point, you just need to call these React methods:
```ts
import { createRoot } from "react-dom/client";
import ReactApp from "src/u";

const root = createRoot(document.getElementById("bifrost"));
root.render(<UIApp />);
```
