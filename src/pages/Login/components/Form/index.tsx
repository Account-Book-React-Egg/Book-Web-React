import React, { useCallback, useState } from 'react';
import { Cell, Input, Checkbox, Modal, Button } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import { LoginType } from '@typings/enums';
import type { FormProps } from './index.d';

import { agree } from '../../index.module.less';

const Form: React.FC<FormProps> = props => {
    const { type, onUsernameChange, onPasswordChange, onVerifyChange } = props;
    const [open, setOpen] = useState(false);

    const Captcha = useCallback(() => {
        if (!props.children) return null;
        return props.children;
    }, []) as React.FC;

    const read = () => {
        const modal = Modal.alert({
            title: '《尧哥最帅条款》',
            content: '不同意也不是不可以',
            onCancel: () => {
                modal.hide();
            },
        });
    };

    return (
        <>
            <Cell icon={<CustomIcon type="zhanghao" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={onUsernameChange}
                />
            </Cell>
            <Cell icon={<CustomIcon type="mima" />}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={onPasswordChange}
                />
            </Cell>
            {type === LoginType.Register ? (
                <>
                    <Cell icon={<CustomIcon type="mima" />}>
                        <Input
                            clearable
                            type="text"
                            placeholder="请输入验证码"
                            onChange={onVerifyChange}
                        />
                        <Captcha />
                    </Cell>

                    <div className={agree}>
                        <Checkbox />
                        <label>
                            阅读并同意
                            <a onClick={read}>《尧哥最帅条款》</a>
                        </label>
                    </div>

                    <Modal
                        visible={open}
                        title="标题"
                        maskClosable
                        onCancel={() => setOpen(false)}
                    >
                        <p>不同意也不是不行</p>
                    </Modal>
                </>
            ) : null}
        </>
    );
};

export default Form;
