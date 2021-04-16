import React, { useMemo }  from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg'

//
// --- Constants ---

const TRANSITION_DURATION = '500ms';
const TRANSITION_STYLE = 'ease-out';
const TUNEIN_GREEN = '#14d8cc';
const BREAKPOINT = '992px'
const SIDE_BAR_WIDTH = '200px'
const TOP_NAV_HEIGHT = '65px';

//
// --- Styled Components ---

const StyledLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;

`;

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  margin-left: ${SIDE_BAR_WIDTH};
  width: 100%;
  overflow-y: auto;
  transition-property: padding margin;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_STYLE};

  @media (max-width: ${BREAKPOINT}) {
    margin-left: 0;
    padding-top: 81px;
    overflow-y: unset;
  }
`;

const StyledSideBar = styled.div`
  background-color: ${TUNEIN_GREEN};
  min-width: ${SIDE_BAR_WIDTH};
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  transition-property: transform;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_STYLE};
  transform: translateX(0);

  @media (max-width: ${BREAKPOINT}) {
    transform: translateX(-${SIDE_BAR_WIDTH});
  }
`;


const StyledTopNav = styled.div`
  transition-property: transform;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_STYLE};
  transform: translateY(-${TOP_NAV_HEIGHT});
  opacity: 0;
  z-index: 9;

  @media (max-width: ${BREAKPOINT}) {
    transform: translateY(0);
    transition-property: transform;
    min-height: ${TOP_NAV_HEIGHT};
    width: 100%;
    opacity: 1;
    position: fixed;
    background-color: ${TUNEIN_GREEN};
  }
`;

const StyledLogo = styled(ReactSVG)`
  position: absolute;
  min-width: 130px;
  left: 35px;
  top: 10px;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_STYLE};

  @media (max-width: ${BREAKPOINT}) {
    transition-property: all;
    min-width: 90px;
    left: 10px;
  }
`;

export const Layout: React.FunctionComponent = ({ children }) => {
  const navLogo = useMemo(() => (
    <nav>
      <Link to={`/radio/home`}>
        <StyledLogo src='https://cdn-web.tunein.com/assets/img/footer/tunein-logo-ink.svg' />
      </Link>
    </nav>
  ), []);

  return (
    <>
     <StyledTopNav>
        {navLogo}
     </StyledTopNav>
     <StyledLayout>
       <StyledSideBar>
          {navLogo}
       </StyledSideBar>
       <StyledMainContent>
          {children}
      </StyledMainContent>
     </StyledLayout>
    </>
  );
}

export default Layout;
