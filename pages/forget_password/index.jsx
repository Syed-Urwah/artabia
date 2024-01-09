import Footerr from '@/components/layout/footer'
import Header from '@/components/layout/header'
import React, { useState } from 'react'
import { getPayload } from '../../enviroment/auth';
import axios from 'axios';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import { Spinner, Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

export default function index() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const base_url = process.env.NEXT_PUBLIC_API_URL;
        console.log(email);

        const response = await axios.post(
            base_url + '/api/send-email-forget-password',
            {
                "pers_email": email
            }
        )

        console.log(response.data.status)

        response.data.status == 'true' && setToast(true)

        setTimeout(()=>{
            setToast(false);
        },5000)

        setLoading(false);
    }

    return (
        <>
            <Header />
            <form onSubmit={handleForgetPassword} id="container" className='h-full flex flex-col justify-center items-center'>
                <div className="flex flex-col items-center gap-2 py-6">
                    <label
                        htmlFor="email"
                        className="font-semibold text-lg w-full "
                    >
                        Enter Email
                    </label>
                    <div className="flex flex-col">
                        <input
                            type="email"
                            id="password"
                            onChange={(e) => setEmail(e.target.value)}
                            name="password"
                            aria-describedby="helper-text-explanation"
                            className=" bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 w-[299px] lg:w-[466px] "
                            placeholder="PASSWORD"
                        />
                    </div>
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-full text-lg font-semibold bg-[#F21079] bg-opacity-30 px-16 py-2 my-4 rounded-full lg:w-[469px]"
                >
                    {loading ? <LoadingSpinner /> : "Send"}
                </button>

                <div className='h-20'>
                {toast && 
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Email Sent successfully.</div>
                    <Toast.Toggle />
                </Toast>
                }
                </div>


            </form>
            <Footerr />
        </>
    )
}
