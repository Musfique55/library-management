import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import email from '../../public/email.png';
import googleIcon from '../../public/google.png';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";


const ToggleSignIn = () => {
    const {googleLogin,register,login,update} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email,password)
        .then(res => {
            if(res.user){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            navigate(location?.state ? location.state : '/');
        })
        .catch(error => {
            const message = error?.message;
            if(error){
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${message}`,
                    showConfirmButton: false,
                    timer: 2500
                  });
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(password.length < 6) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: 'Password must be 6 characters or more',
                showConfirmButton: false,
                timer: 2500
              });
        }
        if(!/^(?=.*[A-Z]).+$/.test(password)){
            return Swal.fire({
                position: "top",
                icon: "error",
                title: 'Must have an Uppercase letter in the password',
                showConfirmButton: false,
                timer: 2500
              });
        }

        if(!/^(?=.*[@.#$!%*?&^]).+$/.test(password)){
            return Swal.fire({
                position: "top",
                icon: "error",
                title: 'Must have an special character in the password',
                showConfirmButton: false,
                timer: 2500
              });
        }

        register(email,password)
        .then(() => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Registered Successfully",
                showConfirmButton: false,
                timer: 1500
              });
            update(name,photoURL)
            .then(() => {
            })
            navigate('/');
        })
        .catch(error => {
            const message = error?.message;
            if(error){
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${message}`,
                    showConfirmButton: false,
                    timer: 2500
                  });
            }
        })
    }

    const google = () => {
        googleLogin()
        .then(() => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Logged in Successfully",
                showConfirmButton: false,
                timer: 1500
              });
            navigate(location?.state ? location.state : '/');
        })
        .catch(error => {
            console.log(error);
        }) 
    }

    const toggleRegister = () => {
        const login = document.getElementById('loginForm');
        const register = document.getElementById('register');
            login.classList.add('hidden');
            register.classList.remove('hidden');
    }
    
    const toggleLogin = () => {
        const login = document.getElementById('loginForm');
        const register = document.getElementById('register');
        register.classList.add('hidden');
            login.classList.remove('hidden');
    }

    return (
        <div className="hero min-h-screen my-12">
            {/* login */}
            <div id="loginForm" className=" flex-col w-[503px] p-4  border">
                    <div className="text-center lg:text-left">
                    <h1 className="text-3xl text-center font-bold">Login now!</h1>
                    </div>
                    <div className="w-full bg-base-100">
                    <form onSubmit={handleLogin} className="card-body pb-0">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Email" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input  name="password" type="password" placeholder="Password" className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                        </div>
                        <div className="form-control mt-6">
                        <button type="submit" className="btn bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Continue</button>
                        <p className="text-center my-3">OR</p>
                        </div>
                    </form>
                    </div>
                    <div className="mx-8">
                    <button id="signup" onClick={() => toggleRegister()} className="flex bg-gradient-to-r from-[#ff4828] to-[#ff204f] text-center text-white py-3 w-full  rounded-md"><img src={email} className="w-7 mr-24 ml-4" alt="" /> Signup With Email</button>
                    <button onClick={google} className=" flex mt-5 bg-[#1166f1] text-center text-white py-3 w-full  rounded-md"><img src={googleIcon} className="w-7 mr-24 ml-4" alt="" /> Continue With Google</button>
                    </div>
            </div>
            {/* register */}
            <div id="register" className="hidden">
                <div className="hero min-h-screen ">
                    <div className=" flex-col w-[503px] p-4  border">
                        <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-center font-bold">Register now!</h1>
                        </div>
                        <div className="w-full bg-base-100">
                        <form onSubmit={handleRegister} className="card-body pb-0">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Your Name" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input name="photoURL" type="text" placeholder="Image URL" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Email" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="Password" className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                            </div>
                            <div className="form-control mt-6">
                            <button className="btn bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Continue</button>
                            <p className="text-center my-3">OR</p>
                            </div>
                        </form>
                        </div>
                        <div className="mx-8">
                        <button onClick={google} className=" flex  bg-[#1166f1] text-center text-white py-3 w-full  rounded-md"><img src={googleIcon} className="w-7 mr-24 ml-4" alt="" /> Continue With Google</button>
                        <p className="text-center mt-3">Already a Member ? <a className="cursor-pointer " onClick={toggleLogin}>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleSignIn;