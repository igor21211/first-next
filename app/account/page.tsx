import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
  description: "Account",
};

const Account = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="text-4xl text-accent-400 font-medium mb-10">
        Welcome {session?.user?.name}
      </h1>
    </div>
  );
};

export default Account;
