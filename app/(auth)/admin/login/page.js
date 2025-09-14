import LoginForm from "@/app/_components/LoginForm";
import Logo from "@/app/_components/Logo";

export const metadata = {
  title: "Admin | Log in",
};

export default function AdminLogin() {
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        {/* Logo */}
        <div className="p flex justify-center pb-5">
          <Logo />
        </div>

        {/* Login Form */}
        <LoginForm noForgot={true} />
      </div>
    </div>
  );
}
