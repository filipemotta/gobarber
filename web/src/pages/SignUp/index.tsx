import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import logoSignUp from '../../assets/logo.svg';
import {Container, Content, BackGround} from './styles';
import {FiArrowLeft,FiMail, FiUser, FiLock} from 'react-icons/fi';
import api from '../../services/api';
//import {Form} from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useToast} from '../../hooks/toast';
import getValidationError from '../../utils/getValidationErrors'

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

const SignUp: React.FC = () => {

    const {addToast}  = useToast();
    const history = useHistory();

    
    const formik =  useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(30, 'Must be 25 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        }),
        onSubmit:  async (values:SignUpFormData, { resetForm }) => {
             
            try {
                const response = await api.post('/users', {
                    name: values.name,
                    email: values.email,
                    password: values.password
                });
                history.push('/');
                addToast({
                    type: 'success',
                    title: 'User sucessfully registered !',
                    description: 'Now you can login on the GoBarber !'
                })
                console.log(response.data);
               resetForm({});
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationError(err);
                    return
                }
            }
        },
         
    });


    return (
        <>
        <Container>
        <BackGround />
            <Content>
                <img src={logoSignUp} alt="Gobarber" />
    
                <form  onSubmit={formik.handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Input 
                    id="name"
                    icon={FiUser} 
                    placeholder="Name"
                    {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
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
                        <div>{formik.errors.name}</div>
                    ) : null}
                    <Button type="submit">Cadastrar</Button>  
                </form>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para a pagina de login
                </Link>
            </Content>
        
        </Container>
        </>
    );
   
};


export default SignUp;