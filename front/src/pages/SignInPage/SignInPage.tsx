import { useForm } from 'react-hook-form';
import { BlackBox } from '../../components/BlackBox/BlackBox';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { myRequest } from '../../utils/axios';
import { isEmail } from 'validator';
import { Button } from '../../components/Button/Button';

import s from './SignInPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/UserDetails';
import { PATHS } from '../../utils/paths';
import { setToken } from '../../utils/auth';

export const SignInPage = () => {
    const nav = useNavigate();
    const { setUserDetails } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        myRequest
            .post('/user/signin', data)
            .then((res: any) => {
                console.log(res);
                setUserDetails((prev) => ({ ...prev, isSignedIn: true }));
                console.log(data);
                setToken(res.authToken);
                nav(PATHS.profile);
            })
            .catch((e) => {
                alert(e.data.message);
            });
    };
    return (
        <MainBlockWrapper title="Авторизация">
            <BlackBox>
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
                <div className={s.footer}>
                    <Button onClick={handleSubmit(onSubmit)}>Auth</Button>
                </div>
            </BlackBox>
        </MainBlockWrapper>
    );
};
