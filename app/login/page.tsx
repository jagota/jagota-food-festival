'use client'
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiLogin, CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";


export const runtime = 'edge';
const Login = () => {
    // State to manage input data (username and password)
    const [data, setData] = useState({
      username: "",
      password: "",
    });
  
    // Accessing the login function from the AuthContext
    const { login } = useAuth();
  
    // Function to update state when input data changes
    const handleDataChange =
      (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
          ...data,
          [name]: e.target.value,
        });
      }; 
  
    // Function to handle the login process
    const handleLogin = async () => {
      const logres = await login(data);
      console.log("logres", logres)
    }
  
    return (
      <>
      <form action="#">
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-neutral-50 to-violet-300">
                <div className=" shadow-xl bg-gradient-to-r to-cyan-500 from-blue-500 md:w-[400px] w-[95%] px-[3rem] py-[5rem] text-white">
                    <div className="flex justify-center items-center pb-3">
                        <div className="border-4 rounded-full w-[100px] h-[100px] flex justify-center items-center text-[3rem]"><CiLogin /></div>
                    </div>
                    <h1 className="text-center text-2xl uppercase">Welcome to Jagota</h1>

                    <div className="pt-[3rem] flex flex-col gap-[3rem]">
                        <div className="border-b-[1px] border-white py-[4px] flex gap-1">
                            <CiUser className="text-2xl" />
                            <input 
                            value={data.username}
                            onChange={handleDataChange("username")}
                            placeholder="Username" 
                            className="bg-transparent border-none focus:outline-none placeholder:text-white 
                            w-full text-xl autofill:transition-colors autofill:duration-200 autofill:bg-transparent" />
                        </div>

                        <div className="border-b-[1px] border-white py-[4px] flex gap-1">
                            <IoLockClosedOutline className="text-2xl" />
                            <input 
                            value={data.password}
                            onChange={handleDataChange("password")}
                            type="password" placeholder="Password" className="bg-transparent border-none focus:outline-none placeholder:text-white w-full text-xl" />
                        </div>

                        {/* <button type="submit" className="bg-white border-[1px] border-transparent text-2xl text-cyan-500 py-3 transition-all hover:bg-transparent hover:border-white hover:text-white">Login</button> */}
                        <button type="submit"  onClick={handleLogin} className="group mt-[2rem] overflow-hidden rounded-full bg-transparent border-[2px] text-2xl font-bold text-white h-[50px] relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white before:w-[0%] before:duration-300 hover:before:w-[100%]"><span className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:text-blue-500">Login</span></button>
                      <br />
                      <p className="text-right text-xs text-white">202405271719</p>
                    </div>
                </div>
            </div>
        </form>
      </>
    );
  };
  
  export default Login;