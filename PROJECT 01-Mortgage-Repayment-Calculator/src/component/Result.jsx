import { useState } from "react";
import illustration from "../assets/images/illustration-empty.svg";

export default function Result({ result }) {
  return (
    <>
      {!result.show ? (
        <div className="flex items-center justify-center flex-col gap-6 p-4">
          <img src={illustration} alt="" />
          <span className="text-white text-[20px] ">Results shown here</span>
          <p className="text-[12px] text-[hsl(203,41%,72%)]  text-justify">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="flex  justify-center flex-col gap-6 p-4">
          <span className="text-white font-bold text-xl">Your results</span>
          <p className="text-justify text-[12px] text-[hsl(203,41%,72%)] font-medium">
            {" "}
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>

          <div className="bg-[hsl(61,70%,52%)] rounded-lg ">
            <div className="bg-gray-900 rounded-md mt-0.5 p-4">
              <div className="p-4 border-b-2 border-[hsl(200,24%,40%)]">
                <p className="text-[hsl(203,41%,72%)] mb-2 text-sm font-bold">
                  Your monthly repayments
                </p>
                <p className="text-[hsl(61,70%,52%)] text-2xl font-bold">
                  ₹ {result.repayment}{" "}
                </p>
              </div>

              <div className="p-4 ">
                <p className="text-[hsl(203,41%,72%)] mb-2">
                  Total you'll repay over the term
                </p>
                <p className="text-white font-bold text-xl">
                  ₹ {result.overall}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
