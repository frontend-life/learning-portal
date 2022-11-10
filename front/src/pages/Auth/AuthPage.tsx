import { Stack, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { myRequest } from '../../utils/axios';

export function AuthPage() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        myRequest.post('/registration', data).then((res) => {
            console.log(res);
        });
    };
    return (
        <MainBlockWrapper title="Регистрация">
            <Stack spacing={4}>
                <h1>Регистрация</h1>
                <TextField {...register('email')} label="Email" />
                <TextField {...register('password')} label="Password" />
                <TextField {...register('name')} label="NickName" />
                <Button onClick={handleSubmit(onSubmit)}>Registration</Button>
            </Stack>
        </MainBlockWrapper>
    );
}
