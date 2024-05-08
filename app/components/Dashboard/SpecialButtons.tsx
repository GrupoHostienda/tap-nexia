export const SpecialButtonOne = () => {
  return (
    <div className=" h-10 relative">
      <div className=" absolute top-1/2 -translate-y-1/2 h-[75%] w-full border border-black border-solid"></div>
      <div className=" absolute left-1/2 -translate-x-1/2 w-[95%] h-full border border-black border-solid"></div>
    </div>
  );
};

export const SpecialButtonTwo = () => {
  return (
    <div className=" h-10 relative">
      <div className=" absolute w-full h-full border border-black border-solid"></div>
      <div className=" absolute -top-1 -left-1 bg-white w-2 h-2 border border-black border-solid"></div>
      <div className=" absolute -top-1 -right-1 bg-white w-2 h-2 border border-black border-solid"></div>
      <div className=" absolute -bottom-1 -left-1 bg-white w-2 h-2 border border-black border-solid"></div>
      <div className=" absolute -bottom-1 -right-1 bg-white w-2 h-2 border border-black border-solid"></div>
    </div>
  );
};
