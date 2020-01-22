import React, {useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import {hot} from 'react-hot-loader/root';

// Import assets
import 'modern-normalize/modern-normalize.css';
import regularwoff2 from '../public/fonts/OpenSans-Regular.woff2';
import regularwoff from '../public/fonts/OpenSans-Regular.woff';
import semiboldwoff2 from '../public/fonts/OpenSans-SemiBold.woff2';
import semiboldwoff from '../public/fonts/OpenSans-SemiBold.woff';
import boldwoff2 from '../public/fonts/OpenSans-Bold.woff2';
import boldwoff from '../public/fonts/OpenSans-Bold.woff';
import ivarwoff2 from '../public/fonts/IvarHeadline-SemiBold.woff2';
import ivarwoff from '../public/fonts/IvarHeadline-SemiBold.woff';

// Import Components
import Container from './components/container';
import Header from './components/header';
import Image from './components/image';
import PrimaryButton from './components/primarybutton';
import SecondaryButton from './components/secondarybutton';
import CautionButton from './components/cautionbutton';

// Global Style
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url('${regularwoff2}') format('woff2'),
        url('${regularwoff}') format('woff'); 
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
        url('${semiboldwoff2}') format('woff2'),
        url('${semiboldwoff}') format('woff'); 
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-display: fallback;
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
        url('${boldwoff2}') format('woff2'),
        url('${boldwoff}') format('woff'); 
  }

  @font-face {
    font-family: 'Ivar Headline';
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
    src: local('Ivar Headline Semi Bold'), local('IvarHeadline-SemiBold'),
        url('${ivarwoff2}') format('woff2'),
        url('${ivarwoff}') format('woff'); 
  }

  body {
    font-family: Open Sans, Segoe UI, Tahoma, sans-serif !important;
    padding: 1em;
    line-height: 1.8em;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    word-wrap: break-word
  }
`;

// Main page
const App = () => {
  const [primaryToggle, setPrimaryToggle] = useState(false);
  const [secondaryToggle, setSecondaryToggle] = useState(false);
  const [cautionToggle, setCautionToggle] = useState(false);
  const [duration, setDuration] = useState(0);

	return (
		<Container>
			<Header>Button Tester <Image/></Header>
      <label>
        Animation Duration(s): &nbsp;
        <input type="text" value={duration} onChange={(event) => setDuration(event.target.value)} />
      </label>
			<p>Primary Button</p>
      <p><PrimaryButton duration={duration}>Primary Default</PrimaryButton></p>
      <p><PrimaryButton duration={duration} enabled={primaryToggle} onClick={() => setPrimaryToggle(!primaryToggle)}>Primary Toggle</PrimaryButton></p>
      <p><PrimaryButton duration={duration} disabled>Primary Disabled</PrimaryButton></p>
      <p>Secondary Button</p>
      <p><SecondaryButton duration={duration}>Secondary Default</SecondaryButton></p>
      <p><SecondaryButton duration={duration} enabled={secondaryToggle} onClick={() => setSecondaryToggle(!secondaryToggle)}>Secondary Toggle</SecondaryButton></p>
      <p><SecondaryButton duration={duration} disabled>Secondary Disabled</SecondaryButton></p>
      <p>Caution Button</p>
      <p><CautionButton duration={duration}>Caution Default</CautionButton></p>
      <p><CautionButton duration={duration} enabled={cautionToggle} onClick={() => setCautionToggle(!cautionToggle)}>Caution Toggle</CautionButton></p>
      <p><CautionButton duration={duration} disabled>Caution Disabled</CautionButton></p>
			<GlobalStyle/>
		</Container>
	);
};

export default hot(App);
