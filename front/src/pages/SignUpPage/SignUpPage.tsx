import { useForm } from 'react-hook-form';
import { BlackBox } from '../../components/BlackBox/BlackBox';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { isEmail } from 'validator';

import s from './SignUpPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '@utils/paths';
import addNt from '@utils/notification';
import { Backend } from '@shared/Backend';
import { useState } from 'react';
import { CircleLoader } from '@components/CircleLoader/CircleLoader';

export function SignUpPage() {
    const nav = useNavigate();
    const [buttonLS, setButtonLS] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        setButtonLS(true);
        Backend.signUpUser(data)
            .then((res /* user */) => {
                alert('Теперь авторизуйтесь');
                nav(PATHS.signin);
            })
            .catch((e) => {
                addNt({ type: 'err', description: e.data.message });
            })
            .finally(() => {
                setButtonLS(false);
            });
    };
    return (
        <MainBlockWrapper title="Регистрация">
            <BlackBox>
                <h1 className={s.header}>создать аккаунт</h1>
                <Input
                    rhfProps={register('email', {
                        required: true,
                        validate: (val: string) => {
                            if (!isEmail(val)) {
                                return 'Incorrect email';
                            }
                        }
                    })}
                    inputProps={{ label: 'Email' }}
                    error={errors.email?.message as string}
                />
                <Input
                    inputProps={{
                        label: 'Password',
                        type: 'password'
                    }}
                    rhfProps={register('password', { required: true })}
                    error={errors.password?.message as string}
                />
                <Input
                    inputProps={{
                        label: 'Confirm password',
                        type: 'password'
                    }}
                    rhfProps={register('confirm_password', {
                        required: true,
                        validate: (val: string) => {
                            if (watch('password') !== val) {
                                return 'Your passwords do no match';
                            }
                        }
                    })}
                    error={errors.confirm_password?.message as string}
                />
                <Input
                    rhfProps={register('name', { required: true })}
                    inputProps={{ label: 'NickName' }}
                />
                <div className={s.footer}>
                    <Button
                        disabled={buttonLS}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {buttonLS ? <CircleLoader /> : 'Registration'}
                    </Button>
                </div>
                <Link to="/signin" className={s.toRegLink}>
                    to authorization
                </Link>
            </BlackBox>
        </MainBlockWrapper>
    );
}
