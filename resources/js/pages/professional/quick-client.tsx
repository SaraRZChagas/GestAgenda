import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

export default function QuickClient() {
    const { props } = usePage();
    const successMessage = (props as any).flash?.success;
    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('professional.quick-client.store'), {
            onSuccess: () => reset(), 
        });
    };

    return (
        <AppLayout>
            <Head title="Registo de Cliente Rápido" />

            {/* Mensagem de sucesso */}
                {successMessage && (
                    <div className="mb-6 rounded bg-green-100 border border-green-400 p-4 text-green-700 text-center max-w-xl mx-auto">
                    {successMessage}
                    </div>
                )}
            
            <form  className="flex flex-col gap-6 max-w-xl mx-auto mt-12" onSubmit={handleSubmit}>
                
                
                
                {/* Campos do formulário */}
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                            <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Nome" required />
                            <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                            <Input value={data.username} onChange={e => setData('username', e.target.value)} placeholder="Username" required />
                            <InputError message={errors.username} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Telefone</Label>
                            <Input value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="Telefone" required />
                            <InputError message={errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                            <Input value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email" type="email" required />
                            <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                            <Input value={data.password} onChange={e => setData('password', e.target.value)} placeholder="Senha" type="password" required />
                            <InputError message={errors.password} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirme a senha</Label>
                            <Input value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)}  placeholder="Confirme a senha" type="password" required/>
                            <Button type="submit" className="mt-2 w-full" disabled={processing}> {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />} Cadastrar Cliente </Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
