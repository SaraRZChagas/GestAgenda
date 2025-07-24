import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  username: string;
  profile_photo: File | null;
};



export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'client',
        username: '',
        profile_photo: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            forceFormData: true,
        });
    };

    return (
        <AuthLayout title="Crie uma conta" description="Insira suas informações para criar uma nova conta.">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                    <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="Phone"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="username">Username público</Label>
                        <div className="bg-gray-100 text-sm text-gray-600 p-3 rounded">
                        Escolha um nome de usuário único, composto apenas por letras, sem espaços, acentos ou caracteres especiais. Esse nome será usado para criar o link do seu site público (ex: gestagenda.pt/seuusername), por isso deve ser exclusivo para cada usuário.
                        </div>
                        <Input
                            id="username"
                            type="text"
                            required
                            placeholder="ex: joaotreinador"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="profile_photo">Foto de perfil</Label>
                        <div className="bg-gray-100 text-sm text-gray-600 p-3 rounded">
                        Envie uma foto em formato retrato, sua ou da sua empresa. O arquivo deve estar nos formatos JPG ou PNG, com tamanho máximo de 500 pixels de altura por 400 pixels de largura. Certifique-se de que a imagem esteja nítida e bem enquadrada.
                        </div>
                        <Input
                            id="profile_photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => { console.log(e); setData('profile_photo', e.target.files?.[0] || null); }}
                            disabled={processing}
                        />
                        <InputError message={errors.profile_photo} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirme a senha</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                     <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="client"
                            checked={data.role === 'client'}
                            onChange={(e) => setData('role', e.target.value)}
                        />
                        Cliente
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="role"
                            value="professional"
                            checked={data.role === 'professional'}
                            onChange={(e) => setData('role', e.target.value)}
                        />
                        Profissional
                    </label>
                </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Criar conta
                    </Button>
                

                <div className="text-center text-sm text-muted-foreground">
                    Já tem uma conta?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
                </div>
            </form>
        </AuthLayout>
    );
}
