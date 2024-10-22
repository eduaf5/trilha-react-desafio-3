import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {
    const navigate = useNavigate()

    const handleClickSignIn = () => {
        navigate('/cadastro')
}

const { control, handleSubmit, formState: { errors  } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
});

const onSubmit = async (formData) => {
    try{
        const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
        
        if(data.length && data[0].id){
            navigate('/cadastro') 
            return
        }

        alert('Usuário ou senha inválido')
    }catch(e){
        //TODO: HOUVE UM ERRO
    }
};

console.log('errors', errors);

return (<>
   <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora gratis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="E-mail" placeholder="E-mail" leftIcon={<MdEmail />}  name="email" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Input type="Password" placeholder="Password" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" onClick={handleClickSignIn} type="button" />
                </form>
                <Row>
                    <Column>
                    <SubtitleLogin>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleLogin>
                    </Column>
                    </Row>
                    <Row>
                    
                    <EsqueciText>Ja tenho conta.</EsqueciText>
                    <CriarText>Fazer login</CriarText>
                    
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }