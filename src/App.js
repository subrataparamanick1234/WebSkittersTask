import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

import jwtDecode from 'jwt-decode';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { store } from 'store';
import { userLoginHelper, userLogout } from 'store/actions/userAction';
// ==============================|| APP ||============================== //
if (window.localStorage.userJwtToken) {
    const decoded = jwtDecode(localStorage.userJwtToken);
    // console.log('🚀 ~ file: App.js ~ line 21 ~ decoded', decoded);
    store.dispatch(userLoginHelper(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(userLogout());
        window.location.href = '/';
    }
}
const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
