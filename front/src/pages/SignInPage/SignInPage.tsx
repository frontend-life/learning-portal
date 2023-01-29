import { useForm } from 'react-hook-form';
import { BlackBox } from '../../components/BlackBox/BlackBox';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';

import { isEmail } from 'validator';
import { Button } from '../../components/Button/Button';

import s from './SignInPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/UserDetails';
import { PATHS } from '@utils/paths';
import { checkIsTeacher, setToken } from '@utils/auth';
import { Backend } from '@shared/Backend';
import { Roles } from '@commonTypes';

export const SignInPage = () => {
    const nav = useNavigate();
    const { setUserDetails } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        Backend.signInUser(data).then((res: any) => {
            // setUserDetails((prev) => ({
            //     ...prev,
            //     ...res.user,
            //     isTeacher: checkIsTeacher(res.user.roles as Roles[]),
            //     isSignedIn: true
            // }));
            setToken(res.authToken);
            // nav(PATHS.profile);
            window.location.reload();
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
                <Link to="/signup" className={s.toRegLink}>
                    to registration
                </Link>
            </BlackBox>
        </MainBlockWrapper>
    );
};
