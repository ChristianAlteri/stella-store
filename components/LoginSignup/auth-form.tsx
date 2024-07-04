"use client";
import Link from "next/link";

import AuthInput from "../ui/auth-input";
import AuthButton from "../ui/auth-button";
import { useRouter } from "next/navigation";
import AuthSocialButton from "../ui/auth-social-button";
import { BsFacebook, BsGoogle, BsInstagram } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import { CiFacebook, CiInstagram } from "react-icons/ci";
// import { signIn, useSession } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

// Custom Toast Error
const toastError = (message: string) => {
  toast.error(message, {
    style: {
      background: "white",
      color: "black",
    },
    icon: <TbFaceIdError size={30} />,
  });
};
// Custom Toast Success
const toastSuccess = (message: string) => {
  toast.error(message, {
    style: {
      background: "white",
      color: "green",
    },
    icon: <TbFaceId size={30} />,
  });
};

const AuthForm = () => {
  // const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/home");
  //   }
  // }, [session?.status, router]);

  // Set up toggle for login/register
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // Set up form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

  };

  //   if (variant === "REGISTER") {
  //     axios
  //       .post("/api/register", data)
  //       // .then(() => toastSuccess('Registered successfully!'))
  //       .then(() => signIn("credentials", data))
  //       .catch(() => toastError("Something went wrong!"))
  //       .finally(() => setIsLoading(false));
  //   }

  //   if (variant === "LOGIN") {
  //     // console.log(data);
  //     signIn("credentials", {
  //       ...data,
  //       redirect: false,
  //     })
  //       .then((callback) => {
  //         if (callback?.error) {
  //           toastError("Invalid credentials");
  //         }

  //         if (callback?.ok) {
  //           router.push("/users");
  //           toastSuccess("Logging in");
  //         }
  //       })
  //       .finally(() => setIsLoading(false));
  //   }
  // };

  const socialAction = (action: string) => {
    // // TODO: ADD META LOGINS
    // setIsLoading(true);

    // signIn(action, { redirect: false })
    //   .then((callback) => {
    //     if (callback?.error) {
    //       toastError("Invalid credentials");
    //     }

    //     if (callback?.ok && !callback?.error) {
    //       // router.push('/conversations')
    //       toastSuccess("Logging in");
    //     }
    //   })
    //   .finally(() => setIsLoading(false));
  };

    return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
          bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <AuthInput
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <AuthInput
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <AuthInput
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <AuthButton disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </AuthButton>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                  absolute 
                  inset-0 
                  flex 
                  items-center
                "
            >
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={FcGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={CiFacebook}
              // Change name to facebook ect
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={CiInstagram}
              onClick={() => socialAction("google")}
            />
          </div>

        </div>
        <div
          className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-slate-500
            "
        >
          <div>
            {variant === "LOGIN"
              ? "New to @nondrobe?"
              : "Already have an account?"}
          </div>

          <div
            onClick={toggleVariant}
            className="underline cursor-pointer  hover:text-light-font"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthForm
;
