import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoSignIn from '../../assets/logo.svg';
import {Container, Content, BackGround} from './styles';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {useAuth} from '../../hooks/auth';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {


    const {signIn} = useAuth();
    const history = useHistory();

    const formik =  useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .required('Password is required')
        }),
        onSubmit:  async (values:SignInFormData, { resetForm }) => {
            console.log(values);  
            signIn({
                email: values.email,
                password: values.password
            }
            );
        //      });
         history.push('/dashboard');
         resetForm({});
        // },
        },
    });

    return (
    <>
    <Container>
        <Content>
            <img src={logoSignIn} alt="Gobarber" />

            <form onSubmit={formik.handleSubmit}>
                <h1>Faça seu Login</h1>
                <Input 
                id="email"
                icon={FiMail} 
                placeholder="E-mail" 
                {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                <Input 
                id="password"
                icon={FiLock} 
                type="password" 
                placeholder="Password"
                {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                <Button type="submit">Entrar</Button>
                <a href="forgot">Esqueci minha senha</a>      
            </form>
            <Link to="/signup">
                <FiLogIn />
                Criar Conta
            </Link>
        </Content>
    <BackGround />
    </Container>
    </>
    )};


export default SignIn;