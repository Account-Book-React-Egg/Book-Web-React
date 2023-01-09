import { useState, useEffect, useCallback, Suspense } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { ActivityIndicator } from 'zarm';
import NavBar from '@/components/NavBar';
import routes from './routes';

const NEED_NAV = ['/', '/bill', '/stats', '/user']; // 需要展示底部NavBar的路径

const Spin = () => (
    <div className="spin">
        <ActivityIndicator type="spinner" size="lg" />
        <br />
        loading...
    </div>
);

const RouterComponent = () => {
    const [showNav, setShowNav] = useState(false);
    const { pathname } = useLocation();

    const getRoute = useCallback(() => {
        return routes.map(r => {
            return r.children.map(item => {
                if (!item.component) return;
                return (
                    <Route
                        exact={!!item.exact}
                        key={item.value}
                        path={item.value}
                        component={item.component}
                    />
                );
            });
        });
    }, []);

    useEffect(() => {
        setShowNav(NEED_NAV.includes(pathname));
    }, [pathname]);

    return (
        <>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {getRoute()}
                    <Redirect exact from="/" to="/bill" />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </Suspense>

            {/* 全局底部导航栏*/}
            <NavBar showNav={showNav} />
        </>
    );
};

export default RouterComponent;
