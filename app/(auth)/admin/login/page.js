import LoginForm from "@/app/_components/LoginForm";
import Logo from "@/app/_components/Logo";

export const metadata = {
  title: "Admin | Log in",
};

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-primary-50 w-full max-w-md rounded-lg p-8 shadow-lg">
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
