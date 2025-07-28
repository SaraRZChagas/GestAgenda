import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState  } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type Contact ={
    idContacts: number | null;
    descContacts: string;
    idContactsTypes: number;
    isActiveContacts: boolean;
}
type ProfileForm = {
    _method: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: File | null;
    contacts: Contact[];
    bioProfessionals: string;
    nameBusinessProfessionals: string;
};

export default function Profile({ mustVerifyEmail, status, userExtraData, contacts: initialContacts = [], contactTypes }: { mustVerifyEmail: boolean; status?: string; userExtraData: any; contacts: any; contactTypes: any; }) {
console.log(userExtraData)
   const { auth } = usePage<{ auth: SharedData['auth']; }>().props;

    const initialPhone =
        userExtraData?.phoneCustomers ?? userExtraData?.phoneProfessionals ?? '';

    const initialAddress =
        userExtraData?.addressCustomers ?? userExtraData?.addressProfessionals ?? '';
    const [preview, setPreview] = useState<string | null>(auth.user?.avatar || userExtraData?.profile_photo);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        _method: 'put',
        name: auth.user.name,
        email: auth.user.email,
        phone: initialPhone,
        address: initialAddress,
        avatar: null,
        bioProfessionals: userExtraData?.bioProfessionals || '',
        nameBusinessProfessionals: userExtraData?.nameBusinessProfessionals || '',
        contacts: initialContacts.map((c: any) => ({
            idContacts: c.idContacts,
            descContacts: c.descContacts || '',
            idContactsTypes: c.idContactsTypes || null,
            isActiveContacts: c.isActiveContacts !== undefined ? c.isActiveContacts : true,
        
        })
    ),});

    function addContact() {
        setData('contacts', [...data.contacts, { idContacts: null, idContactsTypes: 0, descContacts: '', isActiveContacts: true }]);
    }

    function updateContact(index: number, field: string, value: any) {
        const updated = [...data.contacts];
        updated[index] = { ...updated[index], [field]: value };
        setData('contacts', updated);
    }

    function removeContact(index: number) {
        const updated = [...data.contacts];
        updated.splice(index, 1);
        setData('contacts', updated);
    }
    console.log(auth)
    console.log(userExtraData)
    console.log(data)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();


        console.log(data);
        console.log(e);
        post(route('profile.update', auth.user.id), {
            preserveScroll: true,
            forceFormData: true,
            onBefore: (e) => {console.log(JSON.stringify(e.data)); return true;},
            onFinish: (e) => {console.log(e); return true;},
            onError: (e) => {console.log(e); return true;}, 
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Altere aqui as informações do seu perfil" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                defaultValue={data.name}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {auth.user.role === 'professional' && (
                        <>
                            <div className="grid gap-2">
                            <Label htmlFor="nameBusinessProfessionals">Nome do Negócio</Label>
                            <Input
                                id="nameBusinessProfessionals"
                                className="mt-1 block w-full"
                                value={data.nameBusinessProfessionals}
                                onChange={(e) => setData('nameBusinessProfessionals', e.target.value)}
                                maxLength={45}
                                placeholder="Nome do seu negócio"
                            />
                            <InputError className="mt-2" message={errors.nameBusinessProfessionals} />
                            </div>

                            <div className="grid gap-2">
                            <Label htmlFor="bioProfessionals">Biografia</Label>
                            <textarea
                                id="bioProfessionals"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                value={data.bioProfessionals}
                                onChange={(e) => setData('bioProfessionals', e.target.value)}
                                maxLength={1024}
                                placeholder="Conte um pouco sobre você"
                                rows={4}
                            />
                            <InputError className="mt-2" message={errors.bioProfessionals} />
                            </div>
                        </>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                defaultValue={data.email}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Campo de Telefone */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="(00) 00000-0000"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>
                        {/* Lista dinâmica de contatos: */}
                        <div>
                            <h3 className="font-semibold mb-2">Contatos</h3>
                            {data.contacts.map((contact, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-center">
                                <select
                                className="border rounded p-1"
                                value={contact.idContactsTypes ?? ''}
                                onChange={e => updateContact(i, 'idContactsTypes', Number(e.target.value))}
                                required
                                >
                                <option value="" disabled>Tipo de contato</option>
                                {contactTypes.map((ct: any) => (
                                    <option key={ct.idContactsTypes} value={ct.idContactsTypes}>{ct.nameContactsTypes}</option>
                                ))}
                                </select>

                                <input
                                type="text"
                                value={contact.descContacts}
                                onChange={e => updateContact(i, 'descContacts', e.target.value)}
                                placeholder="Contato, URL ou número"
                                className="border rounded p-1 flex-grow"
                                required
                                />

                                <button
                                type="button"
                                onClick={() => removeContact(i)}
                                className="text-red-600 font-bold"
                                aria-label="Remover contato"
                                >
                                ×
                                </button>
                            </div>
                            ))}

                            <Button type="button" onClick={addContact}>Adicionar contato</Button>
                        </div>
                        


                        {/* Upload de Avatar */}
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Foto de Perfil</Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setData('avatar', file);
                                    console.log(file);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => setPreview(reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {preview && <img src={preview} alt="Pré-visualização" className="mt-2 w-24 h-24 rounded-full object-cover" />}
                            <InputError className="mt-2" message={errors.avatar} />
                        </div>
                    <div className="grid gap-2">
                            <Label htmlFor="address">Endereço</Label>
                            <Input
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Endereço completo"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
