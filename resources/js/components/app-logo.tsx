import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2 text-[#4E76AB]">
            <img src="/images/favicon.svg" alt="GestAgenda" className="h-6 w-6" />
            <span className="font-bold">GestAgenda</span>
        </div>
    );
}
