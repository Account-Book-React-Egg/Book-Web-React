import { useCallback, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { ConfigProvider, ActivityIndicator } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import routes from './routes';

const Spin = () => (
    <div className="spin">
        <ActivityIndicator type="spinner" size="lg" />
        <br />
        loading...
    </div>
);

const RouterComponent = () => {
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

    return (
        <ConfigProvider locale={zhCN}>
            <Router>
                <Suspense fallback={<Spin />}>
                    <Switch>
                        {getRoute()}
                        <Redirect exact from="/" to="/home" />
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </Suspense>
            </Router>
        </ConfigProvider>
    );
};

export default RouterComponent;
