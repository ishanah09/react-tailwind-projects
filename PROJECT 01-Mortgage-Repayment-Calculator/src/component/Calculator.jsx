import Result from "./Result";
import calculator from "../assets/images/icon-calculator.svg";
import { useEffect, useState } from "react";
export default function Calculator() {
  const [input, setInput] = useState({
    amount: "",
    term: "",
    rate: "",
    type: {
      repayment: false,
      interest: false,
    },
  });

  const [error, setError] = useState({
    amount: false,
    term: false,
    rate: false,
    type: false,
  });

  const [result, setResult] = useState({
    repayment: "",
    overall: "",
    show: false,
  });

  const [submitted, setSubmitted] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const isInvalid = formValidation();

    if (isInvalid) return;

    showResult();
  }

  function showResult() {
    if (input.type.repayment) {
      let amount = +input.amount;
      let term = +input.term * 12;
      let rate = +input.rate / 100 / 12;

      let repayment =
        amount *
        ((rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1));

      let overall = repayment * term;
      setResult((prev) => ({
        ...prev,
        repayment: repayment.toFixed(2),
        overall: overall.toFixed(2),
        show: true,
      }));

      return;
    }

    if (input.type.interest) {
      let amount = +input.amount;
      let term = +input.term * 12;
      let rate = +input.rate / 100 / 12;

      let repayment = amount * rate;
      let overall = repayment * term;
      setResult((prev) => ({
        ...prev,
        repayment: repayment.toFixed(2),
        overall: overall.toFixed(2),
        show: true,
      }));

      return;
    }
  }

  function handleClear() {
    setInput({
      amount: "",
      term: "",
      rate: "",
      type: {
        repayment: false,
        interest: false,
      },
    });

    setError({
      amount: false,
      term: false,
      rate: false,
      type: false,
    });

    setResult({
      repayment: "",
      overall: "",
      show: false,
    });
    setSubmitted(false);
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  }
  function formValidation() {
    const newError = {
      amount: !input.amount.trim() || +input.amount <= 0,
      term: !input.term.trim() || +input.term <= 0,
      rate: !input.rate.trim() || +input.rate <= 0,
      type: !input.type.repayment && !input.type.interest,
    };

    setError(newError);

    // Return true if any field is invalid
    return Object.values(newError).some(Boolean);
  }

  useEffect(() => {
    if (submitted) {
      formValidation();
    }
  }, [input]);

  return (
    <section className=" max-w-[400px] md:max-w-full  bg-white m-auto md:flex  md:rounded-2xl ">
      <div className="bg-white p-6 md:p-8 mb-3   max-w-[450px] md:flex-1  md:rounded-l-2xl   ">
        <div className="mb-6 md:flex md:justify-between">
          <h1 className=" text-xl mb-1 text-[hsl(202,55%,16%)] font-bold  ">
            Mortgage Calculator
          </h1>
          <button
            className="underline cursor-pointer text-[hsl(200,26%,54%)] font-medium"
            onClick={handleClear}
          >
            Clear All
          </button>
        </div>

        <form
          className="flex flex-col gap-4 items-center justify-center w-full  "
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div className="w-full ">
            <label
              htmlFor="amount"
              className="text-[hsl(200,26%,54%)] font-medium "
            >
              Mortgage Amount
            </label>

            <div
              className={`${
                submitted && error.amount
                  ? " border-[hsl(4,69%,50%)] bg-[hsl(4,69%,50%)] "
                  : "  border-[hsl(200,26%,54%)] bg-[hsl(202,86%,94%)]  "
              }    border-2  flex  justify-between mt-1.5 rounded-md hover:border-[hsl(202,55%,16%)] active:border-[hsl(61,70%,52%)] active:bg-[hsl(61,70%,52%)] active:text-[hsl(202,55%,16%)]`}
            >
              <div
                className={`${
                  submitted && error.amount
                    ? "text-white "
                    : "text-[hsl(200,24%,40%)]"
                } 
                py-[6px] px-3  rounded-r-md  font-bold`}
              >
                ₹
              </div>

              <input
                type="number"
                id="amount"
                className="
              w-full outline-0 border-0 pl-3 cursor-pointer no-spinner bg-white rounded-r-md font-bold"
                onChange={(e) => handleInputChange(e)}
                value={input.amount}
              />
            </div>

            {submitted && error.amount && (
              <span className="text-[hsl(4,69%,50%)] font-bold text-sm">
                {input.amount.trim() === ""
                  ? "This field is required"
                  : "The value must be  greater than zero"}
              </span>
            )}
          </div>

          <div className="w-full md:flex-row md:gap-7 flex flex-col gap-4">
            <div className="w-full ">
              <label
                htmlFor="term"
                className="text-[hsl(200,26%,54%)] font-medium "
              >
                Mortgage Term
              </label>
              <div
                className={`${
                  submitted && error.term
                    ? "border-[hsl(4,69%,50%)] bg-[hsl(4,69%,50%)] "
                    : " border-[hsl(200,26%,54%)] bg-[hsl(202,86%,94%)]  "
                }    border-2  flex  justify-between mt-1.5 rounded-md hover:border-[hsl(202,55%,16%)] active:border-[hsl(61,70%,52%)] active:bg-[hsl(61,70%,52%)] active:text-[hsl(202,55%,16%)]`}
              >
                <input
                  type="number"
                  id="term"
                  className="w-full outline-0 border-0 pl-3 cursor-pointer bg-white rounded-l-md font-bold no-spinner"
                  onChange={(e) => handleInputChange(e)}
                  value={input.term}
                />
                <div
                  className={`${
                    submitted && error.term
                      ? "text-white "
                      : "text-[hsl(200,24%,40%)]"
                  } 
                py-[6px]  px-3  rounded-r-md  font-bold`}
                >
                  Years
                </div>
              </div>
              {submitted && error.term && (
                <span className="text-[hsl(4,69%,50%)] font-bold text-sm">
                  {input.term.trim() === ""
                    ? "This field is required"
                    : "The value must be  greater than zero"}
                </span>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="rate"
                className="text-[hsl(200,26%,54%)] font-medium"
              >
                Interest Rate
              </label>
              <div
                className={`${
                  submitted && error.rate
                    ? " border-[hsl(4,69%,50%)] bg-[hsl(4,69%,50%)] "
                    : "border-[hsl(200,26%,54%)] bg-[hsl(202,86%,94%)]  "
                }    border-2  flex  justify-between mt-1.5 rounded-md hover:border-[hsl(202,55%,16%)] active:border-[hsl(61,70%,52%)] active:bg-[hsl(61,70%,52%)] active:text-[hsl(202,55%,16%)]`}
              >
                <input
                  type="number"
                  id="rate"
                  className="w-full outline-0 border-0 pl-4 cursor-pointer bg-white rounded-l-md font-bold no-spinner"
                  onChange={(e) => handleInputChange(e)}
                  value={input.rate}
                />

                <div
                  className={`${
                    submitted && error.rate
                      ? "text-white "
                      : "text-[hsl(200,24%,40%)]"
                  } 
                py-[6px]  px-3  rounded-r-md  font-bold`}
                >
                  %
                </div>
              </div>
              {submitted && error.rate && (
                <span className="text-[hsl(4,69%,50%)] font-bold text-sm">
                  {input.rate.trim() === ""
                    ? "This field is required"
                    : "The value must be  greater than zero"}
                </span>
              )}
            </div>
          </div>

          <div className="w-full">
            <label className="text-[hsl(200,26%,54%)] font-medium">
              Mortgage Type
            </label>

            <div className="mt-1.5 mb-1 ">
              <label
                htmlFor="repayment"
                className={`${
                  input.type.repayment && "bg-[rgba(215,218,47,0.3)]"
                }    border-2 border-[hsl(200,26%,54%)] flex items-center  gap-3 py-2 pl-4 pr-2 mb-1.5 rounded-md hover:border-[hsl(61,70%,52%)] w-full cursor-pointer text-[hsl(202,55%,16%)] font-bold `}
              >
                <input
                  type="radio"
                  id="repayment"
                  name="mortgage-type"
                  className=" cursor-pointer "
                  onChange={(e) => {
                    setInput({
                      ...input,
                      type: {
                        repayment: true,
                        interest: false,
                      },
                    });
                  }}
                  checked={input.type.repayment}
                />
                Repayment
              </label>

              <label
                htmlFor="interest-only"
                className={`${
                  input.type.interest && "bg-[rgba(215,218,47,0.3)]"
                }    border-2 border-[hsl(200,26%,54%)] flex item-center  gap-3 py-2 pl-4 pr-2  rounded-md hover:border-[hsl(61,70%,52%)] w-full cursor-pointer text-[hsl(202,55%,16%)] font-bold `}
              >
                <input
                  type="radio"
                  id="interest-only"
                  name="mortgage-type"
                  className="cursor-pointer"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      type: {
                        repayment: false,
                        interest: true,
                      },
                    });
                  }}
                  checked={input.type.interest}
                />
                Interest Only
              </label>
            </div>

            {submitted && error.type && (
              <span className="text-[hsl(4,69%,50%)] font-bold text-sm">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="text-md bg-[hsl(61,70%,52%)] rounded-3xl flex items-center justify-center  gap-2 py-3 px-6 cursor-pointer text-[hsl(202,55%,16%)] font-bold hover:opacity-80 mt-3 w-full "
          >
            <img src={calculator} alt="" />
            Calculate Repayments
          </button>
        </form>
      </div>

      <div className="bg-[hsl(202,55%,16%)] px-4 py-6 flex items-center justify-center max-w-[450px] md:flex-1 md:rounded-r-2xl md:rounded-bl-[75px]">
        <Result result={result}></Result>
      </div>
    </section>
  );
}
