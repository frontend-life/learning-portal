import { useForm } from 'react-hook-form';
import { BlackBox } from '../../components/BlackBox/BlackBox';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { myRequest } from '../../utils/axios';

import s from './AuthPage.module.css';

export function AuthPage() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        myRequest.post('/registration', data).then((res) => {
            console.log(res);
        });
    };
    return (
        <MainBlockWrapper title="Регистрация">
            <BlackBox>
                <h1 className={s.header}>создать аккаунт</h1>
                <Input {...register('email')} label="Email" />
                <Input
                    {...register('password')}
                    label="Password"
                    type="password"
                />
                <Input label="Repeat password" type="password" />
                <Input {...register('name')} label="NickName" />
                <div className={s.footer}>
                    <Button onClick={handleSubmit(onSubmit)}>
                        Registration
                    </Button>
                </div>
            </BlackBox>
        </MainBlockWrapper>
    );
}
