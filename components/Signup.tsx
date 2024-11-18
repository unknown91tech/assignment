"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
function LabelledInput({
    label,
    placeholder,
    type = "text",
    name,
    onChange,
  }: {
    label: string;
    placeholder: string;
    type?: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }) {
    return (
      <div>
        <label className="block mb-2 text-sm text-white font-semibold pt-4">
          {label}
        </label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>
    );
  }

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();

    return <div className="flex items-center justify-center min-h-screen bg-neutral-900">
    <div className="w-full max-w-md p-6 bg-black text-white rounded-lg shadow-md">
      <h2 className="text-center text-xl font-bold mb-6">Register with:</h2>
      <div className="flex justify-between gap-4 mb-6">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <span>Google</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <span>Github</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <span>GitLab</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 mb-4">Or</div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <LabelledInput
              label="First Name"
              placeholder="First Name"
              name="FirstName"
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
            />
            <LabelledInput
              label="Last Name"
              placeholder="Last Name"
              name="LastName"
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
            />
          </div>
          <LabelledInput
            label="Username"
            placeholder="Username"
            name="username"
            onChange={(e)=>{
                setUsername(e.target.value)
              }}
          />
          <LabelledInput
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            onChange={(e)=>{
                setEmail(e.target.value)
              }}
          />
          <LabelledInput
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e)=>{
                setPassword(e.target.value)
              }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Minimum length is 8 characters.
        </p>
        <button onClick={async () => {
                            const response = await axios.post("https://assignment-ggcv-five.vercel.app/api/user", {
                                username,
                                password,
                                FirstName,
                                LastName,
                                email
                            });
                            router.push("/user")
                        }} type="button"  className="mt-6 w-full px-4 py-2 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500">Sign in</button>
      <p className="text-center text-xs text-gray-400 mt-4">
        By creating an account, you agree to the{" "}
        <a href="#" className="text-yellow-400 hover:underline">
          Terms of Service
        </a>
        . We’ll occasionally send you account-related emails.
      </p>
      <p className="text-center text-sm mt-4">
        <span className="text-gray-400">Already have an account? </span>
        <a href="/login" className="text-yellow-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>

}

