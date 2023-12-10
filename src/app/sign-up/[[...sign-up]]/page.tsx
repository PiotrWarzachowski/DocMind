import { SignUp } from "@clerk/nextjs";

const signUpPage = () => {
  return (
    <div className="container lg:scale-150 md:scale-100">
      <div className="flex justify-center pt-40 pb-10">
        <SignUp />
      </div>
    </div>
  );
};

export default signUpPage;
