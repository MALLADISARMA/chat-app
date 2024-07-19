import GenderCheckbox from "./gendercheckbox";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import useSignup from "../../hooks/usesignup";
const SignUp=()=>{
	const [inputs,setInputs]=useState({
		fullname:'',
		username:'',
		password:'',
		confirmpassword:'',
		gender:'',

	});
	const { loading, signup } = useSignup();
	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};


    return(
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChitChat</span>
				</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='malladi sarma'
							className='w-full input input-bordered  h-10'
							value={inputs.fullname}
							onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
							
						/>

                    </div>
                    <div>
                    <label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='malladisarma'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							
						/>
                    </div>
                    <div>
                    <label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							
						/>
                    </div>
                    <div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmpassword}
							onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
							
						/>
					</div>
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'>
                      Already have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700'
						  disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
                    </div>

                </form>

                
            </div>
        </div>


    );
};
export default SignUp;