import React  from 'react';
import logoSignUp from '../../assets/logo.svg';
import {Container, Content, BackGround} from './styles';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

const SignUp: React.FC = () => {
    
    return (
        <Container>
            <BackGround />
            <Content>
            <img src={logoSignUp} alt="Gobarber" />
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
            .max(30, 'Must be 25 characters or less')
            .required('Name is Required'),
          email: Yup.string().email('Invalid email address').required('E-mail is Required'),
          password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          })}
          onSubmit={(values, { setSubmitting }) => {
             setTimeout(async () => {
                await api.post<SignUpFormData>('/users', {
                    name: values.name,
                    email: values.email,
                    password: values.password
                });
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            
            <Field 
            className="input" 
            name="name" 
            placeholder="Name" 
            type="text" />
            <ErrorMessage name="name" />
           
            <Field className="input" name="email" placeholder="E-mail" type="email" />
            <ErrorMessage name="email" />
            
            <Field className="input" name="password" placeholder="Password" type="password" />
            <ErrorMessage name="password" />
            <button type="submit">Cadastrar</button>
          </Form>
        </Formik>
        <a href="create">
            <FiArrowLeft />
            Voltar para a pagina de login
        </a>
        </Content>
        </Container>
      );
   
   
};


export default SignUp;