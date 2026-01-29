import { actionLogin, hasAuthErrorSelector, isLoadingUserSelector, useAppDispatch, useAppSelector } from '@/store'
import { LoginForm } from '@/components/LoginForm'
import { useNavigate } from 'react-router'


export function LoginPage() {
    const dispatch = useAppDispatch()
    const error = useAppSelector(hasAuthErrorSelector)
    const isLoading = useAppSelector(isLoadingUserSelector)

    const navigate = useNavigate();


    const handleLogin = (username: string, password: string) => {
        dispatch(actionLogin({ username, password })).unwrap().then(() => navigate('/user'))
    }

    return <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error ? 'Invalid credential' : undefined} />
}
