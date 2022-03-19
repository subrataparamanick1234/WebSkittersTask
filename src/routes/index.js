import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { userRoot } = useSelector((store) => store);

    // console.log('ssss---->', userRoot);

    const routing = useRoutes(MainRoutes(userRoot));

    return <div>{routing}</div>;
}
