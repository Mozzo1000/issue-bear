import { Button, Label, TextInput, Card } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import Logo from "../assets/logo.svg";
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { useToast } from '../useToast';

function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConf, setPasswordConf] = useState();
    const [passwordError, setPasswordError] = useState();
    const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);

    let navigate = useNavigate();
    const toast = useToast(4000);

    const handleRegistration = (e) => {
        e.preventDefault();
        AuthService.register(email, name, password).then(
            response => {
                toast("success", response.data.message);
                navigate("/verify", {state: {"email": email}})
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast("error", resMessage);
            }
        )
    }

    useEffect(() => {
        if (passwordConf !== password) {
            setPasswordError("Passwords do not match");
            setRegisterButtonDisabled(true);
        }
        if (!password && !passwordConf) {
            setPasswordError("");
        }
    }, [password, passwordConf])

    useEffect(() => {
        if (passwordConf === password) {
            if (passwordConf && password && email && name) {
                setRegisterButtonDisabled(false);
                setPasswordError("")
            }
        }
    }, [password, passwordConf, email, name, passwordError])

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    Issue Bear
                </a>
                <Card>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create an account</h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleRegistration}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your name" />
                            </div>
                            <TextInput id="name" type="text" required={true} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput id="email" type="email" placeholder="name@company.com" required={true} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required={true} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Confirm password" />
                            </div>
                            <TextInput id="password2" type="password" required={true} value={passwordConf} onChange={e => setPasswordConf(e.target.value)} helperText={passwordError} />
                        </div>
                        <Button className="w-full" type="submit" disabled={registerButtonDisabled}>Create an account</Button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                        </p>
                    </form>
                </Card>
            </div >
        </section >
    )
}

export default Register