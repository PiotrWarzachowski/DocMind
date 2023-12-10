import { SignIn } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
const signInPage = () => {
  return (
    <div className="container lg:scale-150 md:scale-100">
      <div className="flex justify-center pt-40 pb-10">
        <SignIn />
      </div>
    </div>
  );
};

export default signInPage;
