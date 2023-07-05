import { Button, Label, TextInput, Card } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import Logo from "../assets/logo.svg";
import { useNavigate, useLocation} from 'react-router-dom';
import AuthService from "../services/auth.service";
import { useToast } from '../useToast';

function Login() {
    const [code, setCode] = useState();
    const [email, setEmail] = useState();

    let navigate = useNavigate();
    let location = useLocation();
    const toast = useToast(4000);

    useEffect(() => {
        setEmail(location.state.email);
    }, [location.state])
    

    const handleVerify = (e) => {
        e.preventDefault();
        AuthService.verify(email, code).then(
            response => {
                toast("success", response.data.message + ". Please login!")
                navigate("/login")
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

    const maskEmail = (address) => {
        const regex = /(^.|@[^@](?=[^@]*$)|\.[^.]+$)|./g;
        return address.replace(regex, (x, y) => y || '*')
    }; 

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    Issue Bear
                </a>
                <Card>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Verify your account</h1>
                    {email &&
                        <p className="prose">A verification code has been sent to <span className="bg-gray-100">{maskEmail(email)}</span></p>
                    }
                    <form className="space-y-4 md:space-y-6" onSubmit={handleVerify}>
                        {!email &&
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@company.com" required={true} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        }
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="code1" value="Verification code" />
                            </div>
                            <TextInput minLength="8" maxLength="8" id="code1" type="text" placeholder="ABCD1234" required={true} value={code} onChange={e => setCode(e.target.value)} />
                        </div>
                        <Button className="w-full" type="submit">Verify</Button>
                    </form>
                </Card>
            </div >
        </section >
    )
}

export default Login