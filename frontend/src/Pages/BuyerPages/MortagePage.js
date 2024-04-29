import React, { useState } from "react";
import BuyerHeader from "../../Components/BuyerHeader";
import bgimage from "../../assets/bgimage.png";

const MortagePage = () => {
  const [monthlySalary, setMonthlySalary] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEMI] = useState("");

  const calculateEMI = () => {
    if (
      !monthlySalary ||
      !propertyPrice ||
      !downPayment ||
      !loanAmount ||
      !loanTerm ||
      !interestRate ||
      !interestRate
    ) {
      return alert("Please fill all fields");
    }
    const loanAmountAfterDownPayment = propertyPrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const emiValue =
      (loanAmountAfterDownPayment *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    setEMI(emiValue.toFixed(2));
    setDownPayment("");
    setInterestRate("");
    setLoanAmount("");
    setMonthlySalary("");
    setPropertyPrice("");
    setLoanTerm("");
  };

  return (
    <>
      <BuyerHeader />
      <div
        className="h-screen"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4">
          <div className="flex justify-center mt-5">
            <div className="box bg-slate-300 rounded-xl p-4  w-[700px] flex flex-col gap-10 ">
              <div className="input flex justify-evenly">
                <input
                  className="p-4 rounded-xl outline-none w-[280px]"
                  placeholder="Enter your monthly salary"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(parseFloat(e.target.value))}
                />
                <input
                  className="p-4 rounded-xl outline-none w-[280px] "
                  placeholder="Enter property price"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(parseFloat(e.target.value))}
                />
              </div>
              <div className="input flex justify-evenly">
                <input
                  className="p-4 rounded-xl outline-none w-[280px]"
                  placeholder="Enter amount of downpayment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                />
                <input
                  className="p-4 rounded-xl outline-none w-[280px] "
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="input flex justify-evenly">
                <input
                  className="p-4 rounded-xl outline-none w-[280px]"
                  placeholder="Enter for how many years"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                />
                <select
                  className="p-4 rounded-xl outline-none w-[280px]"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                >
                  <option hidden value="">
                    Select rate of interest%
                  </option>
                  <option value="4">4%</option>
                  <option value="6">6%</option>
                  <option value="8">8%</option>
                  <option value="12">12%</option>
                </select>
              </div>
              <button
                className=" bg-violet-500 hover:bg-violet-400 cursor-pointer  place-self-center p-4 rounded-xl font-bold text-lg"
                onClick={calculateEMI}
              >
                Calculate
              </button>
              {emi ? (
                <div className="flex justify-center font-bold text-2xl">
                  <p>Your monthly Mortgage will be: {emi}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MortagePage;
