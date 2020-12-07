import React, {useState, FormEvent, useEffect, useCallback, useRef } from 'react';
import logoSignUp from '../../assets/logo.svg';
import {Container, Content, BackGround} from './styles';
import {FiArrowLeft,FiMail, FiUser, FiLock} from 'react-icons/fi';
import api from '../../services/api';
//import {Form} from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

const SignUp: React.FC = () => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [ inputError, setInputError ] = useState('');
    
    async function handleOnSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    
        event.preventDefault();

        const user = {
            name: newName,
            email: newEmail,
            password: newPassword,
        };
        

        await api.post<SignUpFormData>('/users', user);

   
    }



    return (
        <>
        <Container>
        <BackGround />
            <Content>
                <img src={logoSignUp} alt="Gobarber" />
    
                <form onSubmit={handleOnSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Input name="name" 
                    icon={FiUser} 
                    placeholder="Nome"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    />
                    <Input 
                    name="email" 
                    icon={FiMail} 
                    placeholder="E-mail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)} />
                    <Input 
                    name="password" 
                    icon={FiLock} 
                    type="password" 
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                    <Button type="submit">Cadastrar</Button>  
                </form>
                <a href="create">
                    <FiArrowLeft />
                    Voltar para a pagina de login
                </a>
            </Content>
        
        </Container>
        </>
    );
   
};


export default SignUp;