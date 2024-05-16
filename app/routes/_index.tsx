import { Link } from "@remix-run/react";

const Index = () => {
  return (
    <div className=" min-h-screen bg-home grid place-items-center ">
      <div className=" flex flex-col gap-3 items-center">
        <h1 className="text-white text-3xl">LANDING PAGE</h1>

        <Link
          to="/login"
          className=" bg-slate-200 capitalize text-center text-slate-700 rounded-full px-4 py-2 hover:text-slate-200 hover:bg-transparent border border-slate-400 transition-all"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
};

export default Index;
