import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      if (data.status !== "success") {
        setMessage(data.message);
      } else {
        setSuccess(true);
        setMessage("Login successful! Redirecting to home...");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px] p-8">
        <h1 className="text-2xl">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {success && message && (
              <FormMessage className="text-blue-600">{message}</FormMessage>
            )}
            {!success && message && <FormMessage>{message}</FormMessage>}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="johndoe123"
                        {...field}
                        className="pr-12"
                      />
                      <button
                        type="button"
                        className="absolute top-1/4 right-4 cursor-pointer"
                        onClick={() => {
                          setShow((prev) => {
                            return !prev;
                          });
                        }}
                      >
                        {show ? <EyeClosed size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Not a user yet?{" "}
          <span className="text-blue-600 ">
            <Link to={"/signup"}>Sign up here!</Link>
          </span>
        </p>
      </Card>
    </div>
  );
}
