import { useState, useCallback } from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import Captcha from 'react-captcha-code';
import http from '@/utils/http';
import type { InputChange } from '@/typings/modules/login';

import style from './index.module.less';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    const [captcha, setCaptcha] = useState('');

    const onInputChange: InputChange = (setState, value) => {
        value && setState(value);
    };

    const onCaptchaChange = useCallback((c: string) => {
        setCaptcha(c);
    }, []);

    const onSubmit = async () => {
        if (!username) return Toast.show('请输入账号');
        if (!password) return Toast.show('请输入密码');
        if (!verify) return Toast.show('请输入验证码');
        if (verify != captcha) return Toast.show('验证码错误');

        await http.post('/user/register', { username, password });
        Toast.show('注册成功');
    };

    return (
        <div className={style.auth}>
            <div className={style.head} />
            <div className={style.tab}>
                <span>注册</span>
            </div>
            <div className={style.form}>
                <Cell icon={<CustomIcon type="zhanghao" />}>
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入账号"
                        onChange={(value?: string) =>
                            onInputChange(setUsername, value)
                        }
                    />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        clearable
                        type="password"
                        placeholder="请输入密码"
                        onChange={(value?: string) =>
                            onInputChange(setPassword, value)
                        }
                    />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入验证码"
                        onChange={(value?: string) =>
                            onInputChange(setVerify, value)
                        }
                    />
                    <Captcha charNum={4} onChange={onCaptchaChange} />
                </Cell>
            </div>
            <div className={style.operation}>
                <div className={style.agree}>
                    <Checkbox />
                    <label className="text-light">
                        阅读并同意<a>《尧哥最帅条款》</a>
                    </label>
                </div>
                <Button block theme="primary" onClick={onSubmit}>
                    注册
                </Button>
            </div>
        </div>
    );
};

export default Login;
