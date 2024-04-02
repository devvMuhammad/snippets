"use client";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
// import { customSignIn } from "../../../db/queries/signIn";
// import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().min(1, "Please enter a valid email address").email(),
  password: z
    .string()
    .min(1, "Please enter a password")
    .refine(
      (val) => val.length > 3, // /\d/.test(password) && // /[a-z]/.test(password) && // /[A-Z]/.test(val) &&
      // /[!@#$%^&*(),.?":{}|<>]/.test(password),
      {
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
  loginError: z.string().optional(),
});

type TLoginSchema = z.infer<typeof LoginSchema>;

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    // setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form
      className="mt-6"
      onSubmit={handleSubmit((formData) => console.log(formData))}
    >
      <label className="text-sm font-medium" htmlFor="email">
        Email
      </label>
      <Input
        disabled={loading}
        {...register("email")}
        className="mt-2 mb-2 border-gray-700"
        id="email"
        placeholder="tumeraputtar@rmail.com"
        type="text"
      />
      {errors.email && (
        <p className="text-xs mb-2 text-red-500">{errors.email.message}</p>
      )}
      <label className="text-sm font-medium" htmlFor="password">
        Password
      </label>
      <Input
        disabled={loading}
        {...register("password")}
        className="mt-2 mb-2 border-gray-700"
        id="password"
        placeholder="****************"
        type="password"
      />
      {errors.password && (
        <p className="text-xs mb-4 text-red-500">{errors.password.message}</p>
      )}
      {errors.loginError && (
        <p className="text-xs mb-4 text-red-500">{errors.loginError.message}</p>
      )}
      <Button disabled={loading} className="mt-2 w-full">
        {loading ? "Loading..." : "Sign in"}
      </Button>
    </form>
  );
}
