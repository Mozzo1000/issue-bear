import { Button, Label, TextInput, Card } from 'flowbite-react'
import React, { useState } from 'react'
import Logo from "../assets/logo.svg";
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { useToast } from '../useToast';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const toast = useToast(4000);

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            response => {
                navigate("/")
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                if (error.response.status == "403" && error.response.data.message == "Account has not been verified.") { 
                    navigate("/verify", {state: {"email": username}})
                }
                toast("error", resMessage);
            }
        )
    }
    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    Issue Bear
                </a>
                <Card>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@company.com" required={true} value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required={true} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <Button className="w-full" type="submit">Sign in</Button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline">Sign up</Link>
                        </p>
                    </form>
                </Card>
            </div >
        </section >
    )
}

export default Login