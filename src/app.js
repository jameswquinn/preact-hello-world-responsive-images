import { h, render } from 'preact';
import responsiveImage from './example.png';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <img 
        src={responsiveImage.src} 
        srcSet={responsiveImage.srcSet} 
        sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 960px"
        alt="Example" 
      />
    </div>
  );
}

render(<App />, document.body);
