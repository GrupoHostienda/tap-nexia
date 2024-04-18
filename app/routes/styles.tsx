import data from "data.json";
import { IoMdLock } from "react-icons/io";

/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Hostienda | Styles",
    },
    {
      name: "description",
      content: "Styles page",
    },
  ];
}

export default function Styles() {
  const { styles } = data;

  return (
    <div className=" min-h-screen bg-slate-200 ">
      {/* Buttons */}
      <div className="py-4 max-w-3xl mx-auto px-4 sm:px-6 ">
        <h2 className="text-lg font-bold">Buttons</h2>

        <div className=" bg-white p-4 rounded-lg flex flex-col gap-10">
          <div>
            <p className=" pb-2">Border</p>
            <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
              {styles.border.map((style, index) => {
                return (
                  <div
                    key={index}
                    className={` border h-10 bg-black ${style.class} `}
                    // onClick={() => setRadius(style.class)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div>
            <p className=" pb-2">Soft shadow</p>
            <div className=" grid grid-cols-1  sm:grid-cols-3 gap-6 sm:gap-4 ">
              {styles.softShadow.map((style, index) => {
                return (
                  <div
                    key={index}
                    className={` border h-10 ${style.class} `}
                    // onClick={() => setRadius(style.class)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div>
            <p className=" pb-2">Hard shadow</p>
            <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
              {styles.hardShadow.map((style, index) => {
                return (
                  <div
                    key={index}
                    className=" relative z-0 h-10"
                    // onClick={() => setRadius(style.class)}
                  >
                    <div
                      className={`h-full w-full border bg-white ${style.class}`}
                    ></div>
                    <div
                      className={` h-full w-full bg-black absolute top-[0.30rem] left-[0.30rem] -z-10 ${style.class} `}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* special */}
          <div>
            <div className=" flex gap-3 items-center pb-2">
              <p>Special</p>
              <p className=" bg-black text-white px-2 rounded-md flex items-center gap-1">
                <span>Upgrade</span>
                <IoMdLock />
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className=" box01 h-10 bg-black"></div>
              <div className=" box02 h-10 bg-black"></div>
              <div className="  h-10 bg-black rounded-l-full"></div>
              <div className=" h-10 relative">
                <div className=" absolute top-1/2 -translate-y-1/2 h-[75%] w-full border border-black border-solid"></div>
                <div className=" absolute left-1/2 -translate-x-1/2 w-[95%] h-full border border-black border-solid"></div>
              </div>
              <div className="  h-10 bg-black rounded-full"></div>
              <div className=" h-10 relative">
                <div className=" absolute w-full h-full border border-black border-solid"></div>
                <div className=" absolute -top-1 -left-1 bg-white w-2 h-2 border border-black border-solid"></div>
                <div className=" absolute -top-1 -right-1 bg-white w-2 h-2 border border-black border-solid"></div>
                <div className=" absolute -bottom-1 -left-1 bg-white w-2 h-2 border border-black border-solid"></div>
                <div className=" absolute -bottom-1 -right-1 bg-white w-2 h-2 border border-black border-solid"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* backgrounds */}
      <div className="py-4 max-w-3xl mx-auto px-4 sm:px-6 ">
        <h2 className="text-lg font-bold">Backgrounds</h2>

        <div className=" bg-white p-4 rounded-lg">
          <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
            <div>
              <div className=" h-[30rem] sm:h-80 bg-gray-300 rounded-md"></div>
              <p className=" pt-2 text-center">Flat Colour</p>
            </div>
            <div>
              <div className=" h-[30rem] sm:h-80 bg-home rounded-md"></div>
              <p className=" pt-2 text-center">Gradient</p>
            </div>
            <div className=" relative">
              <div
                className=" h-[30rem] sm:h-80 border border-black rounded-md"
                style={{
                  backgroundImage: 'url("/no-image.svg")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "30%",
                  opacity: "0.2",
                }}
              ></div>
              <p className=" pt-2 text-center">Image</p>
              <p className=" absolute top-3 right-3 bg-black text-white px-2 rounded-md flex items-center gap-1">
                <span>Upgrade</span>
                <IoMdLock />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
