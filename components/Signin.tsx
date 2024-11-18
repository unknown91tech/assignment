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

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="w-full max-w-md p-6 bg-black text-white rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-6">Sign in with:</h2>
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
          <LabelledInput
            label="Username"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <LabelledInput
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        
        <button
          onClick={async () => {
            const response = await axios.post("https://assignment-ggcv-five.vercel.app//login", {
              username,
              password,
            });

            if (response.status === 200) {
              router.push("/user");  
            } else {
                
            }
          }}
          type="button"
          className="mt-6 w-full px-4 py-2 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500"
        >
          Sign in
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          By signing in, you agree to the{" "}
          <a href="#" className="text-yellow-400 hover:underline">
            Terms of Service
          </a>
          . We'll occasionally send you account-related emails.
        </p>

        <p className="text-center text-sm mt-4">
          <span className="text-gray-400">Don't have an account? </span>
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
