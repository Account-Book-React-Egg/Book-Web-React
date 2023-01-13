import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Toast, Tabs } from 'zarm';
import Captcha from 'react-captcha-code';
import Form from './components/Form';
import http from '@/utils/http';
import { isNullOrUnDef } from '@/utils/is';
import { LoginType } from '@/typings/enums';
import type { InputChange } from '@/typings/modules/login';

import style from './index.module.less';

const { Panel } = Tabs;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(''); // 真实验证码
    const [verify, setVerify] = useState(''); // 输入的验证码
    const [type, setType] = useState(LoginType.Login); // 登录 or 注册

    const history = useHistory();

    const onInputChange: InputChange = (setState, value) => {
        if (isNullOrUnDef(value)) return;
        setState(value);
    };

    const onCaptchaChange = useCallback((c: string) => {
        setCaptcha(c);
    }, []);

    const register = async () => {
        if (!verify) return Toast.show('请输入验证码');
        if (verify !== captcha) return Toast.show('验证码错误');

        await http.post('/user/register', { username, password });
        Toast.show('注册成功');
        // todo 成功跳转到登录, 用户免输入
        // setType(LoginType.Login);
    };

    const login = async () => {
        try {
            const { data } = await http.post('/user/login', {
                username,
                password,
            });
            localStorage.setItem('token', data.token);
            history.push('/');
        } catch (error) {
            localStorage.removeItem('token');
        }
    };

    const onSubmit = async () => {
        if (!username) return Toast.show('请输入账号');
        if (!password) return Toast.show('请输入密码');
        if (type === LoginType.Register) return register();
        login();
    };

    return (
        <div className={style.auth}>
            <div className={style.head} />

            <Tabs
                value={type}
                swipeable
                lineWidth={60}
                onChange={(value?: number) => {
                    onInputChange(setType, value);
                }}
            >
                <Panel title="登录">
                    <div className={style.form}>
                        <Form
                            type={LoginType.Login}
                            onUsernameChange={value => {
                                onInputChange(setUsername, value);
                            }}
                            onPasswordChange={value => {
                                onInputChange(setPassword, value);
                            }}
                        />
                    </div>
                </Panel>
                <Panel title="注册">
                    <div className={style.form}>
                        <Form
                            type={LoginType.Register}
                            onUsernameChange={value => {
                                onInputChange(setUsername, value);
                            }}
                            onPasswordChange={value => {
                                onInputChange(setPassword, value);
                            }}
                            onVerifyChange={value => {
                                onInputChange(setVerify, value);
                            }}
                        >
                            <Captcha charNum={4} onChange={onCaptchaChange} />
                        </Form>
                    </div>
                </Panel>
            </Tabs>

            <div className={style.agree}>
                <Button block theme="primary" onClick={onSubmit}>
                    注册
                </Button>
            </div>
        </div>
    );
};

export default Login;
