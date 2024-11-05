import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Login() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  required
                  value={inputValues.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  value={inputValues.password || ""}
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={status == "loading" ? true : false}
            >
              {status == "loading" ? "Signing In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
