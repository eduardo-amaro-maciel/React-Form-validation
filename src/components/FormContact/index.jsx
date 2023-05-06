import { Form, Label, Input, Row, Col, FormGroup, FormFeedback } from "reactstrap"
import Select from "react-select"
import SendForm from "../SendForm"
import ErrorMessage from "../ErrorMessage"
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from "react-input-mask";
import { options } from '../../utils/optionsSelect'


const contactSchema = z.object({
    nome: z.string().nonempty('Obrigatório').min(3, 'No minimo 3 caracteres'),
    email: z.string().nonempty('Obrigatório').email('Formato incorreto'),
    celular: z.string().nonempty('Obrigatório').min(15, 'Formato incorreto'),
    nascimento: z.string().nonempty('Obrigatório').min(10, 'Formato incorreto'),
    cep: z.string().nonempty('Obrigatório').min(9, 'Formato incorreto'),
    endereco: z.string().nonempty('Obrigatório').min(3, 'Insira um endereço valido'),
    localidade: z.string().nonempty('Obrigatório').min(3, 'Insira uma localidade valida'),
    selecao: z.array(
        z.object({
            value: z.string(),
        })
    ).min(1, 'É necessário no minimo 1 item'),
    sexo: z.string().nonempty('ola')
});


export default function FormContact() {

    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm({
        resolver: zodResolver(contactSchema),
        mode: 'all',
        defaultValues: {
            nome: '',
            email: '',
            celular: '',
            nascimento: '',
            cep: '',
            endereco: '',
            localidade: '',
            selecao: [],
            sexo: ''
        }
    })

    function searchCep(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(({ localidade, logradouro }) => {
                setValue('endereco', logradouro)
                setValue('localidade', localidade)
            })
            .catch(error => console.log('Recusado'))
    }

    function sendForm(data) {
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(sendForm)} className="flex flex-col gap-3 flex-1">
            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="nome" className="mb-1">Nome</label>
                    <input type="text" id="nome" className="input-primary" {...register('nome')} />
                    {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="email" className="mb-1">E-mail</label>
                    <input type="email" id="email" className="input-primary" {...register('email')} />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="tel" className="mb-1">Celular com DDD</label>
                    <InputMask mask="(99) 99999-9999" className="input-primary" alwaysShowMask={false} maskPlaceholder={null} {...register('celular')} />
                    {errors.celular && <ErrorMessage>{errors.celular.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="data-nascimento" className="mb-1">Data de nascimento</label>
                    <InputMask mask="99/99/9999" className="input-primary" alwaysShowMask={false} maskPlaceholder={null} {...register('nascimento')} />
                    {errors.nascimento && <ErrorMessage>{errors.nascimento.message}</ErrorMessage>}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="cep" className="mb-1">CEP</label>
                    <InputMask mask="99999-999" className="input-primary" alwaysShowMask={false} maskPlaceholder={null} {...register('cep')} onBlur={cep => searchCep(cep.target.value)} />
                    {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="endereco" className="mb-1">Endereço</label>
                    <input type="text" id="endereco" className="input-primary" {...register('endereco')} />
                    {errors.endereco && <ErrorMessage>{errors.endereco.message}</ErrorMessage>}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="localidade" className="mb-1">Localidade</label>
                    <input type="text" id="localidade" className="input-primary" {...register('localidade')} />
                    {errors.localidade && <ErrorMessage>{errors.localidade.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col flex-1">
                    <label htmlFor="selecao" className="mb-1">Escolha uma opção</label>
                    <Controller
                        control={control}
                        name="selecao"
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                        }) => (
                            <Select
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        '&:hover': {
                                            border: '2px solid #17171b',
                                        },
                                        backgroundColor: 'white',
                                        padding: '.20rem',
                                        color: '#17171b',
                                        border: state.isFocused ? '2px solid #17171b' : '2px solid #ced4da',
                                        borderRadius: '8px',
                                        boxShadow: 'none'
                                    }),
                                }}
                                options={options}
                                onChange={onChange}
                                isMulti={true}
                                value={value}
                                ref={ref}
                                name={name}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors.selecao && <ErrorMessage>{errors.selecao.message}</ErrorMessage>}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                    <label className="mb-1">Sexo</label>
                    <div className="flex gap-3">
                        <div className="flex gap-1">
                            <input type="radio" id="radio1" value="Masculino" {...register("sexo")} />
                            <label htmlFor="radio1">Masculino</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" id="radio2" value="Feminino" {...register("sexo")} />
                            <label htmlFor="radio2">Feminino</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" id="radio3" value="Outro" {...register("sexo")} />
                            <label htmlFor="radio3">Outro</label>
                        </div>
                    </div>
                    {errors.sexo && <ErrorMessage>{errors.sexo.message}</ErrorMessage>}
                </div>
            </div>

            <SendForm />
        </Form>
    )
}