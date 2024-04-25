"use client";
import Link from "next/link";


interface LogInAndSignUpProps {

}

const LogInAndSignUp: React.FC<LogInAndSignUpProps> = ({}) => {
    return (
      <>
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl font-bold text-center">
              No account? Sign up now!
              <div>make sign up and login!</div>
            </h1>
            <Link href="/">Or continue as a guest</Link>
          </div>
        </div>
      </>
    );
  };

export default LogInAndSignUp;
