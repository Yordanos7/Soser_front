import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  ClockIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("13");
  const [loanTerm, setLoanTerm] = useState("");
  const [paymentsPerYear, setPaymentsPerYear] = useState("12");
  const [startDate, setStartDate] = useState("");
  const [extraPayments, setExtraPayments] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const calculateLoan = () => {
    // Reset error and results
    setError("");
    setResults(null);

    // Parse inputs
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termInYears = parseFloat(loanTerm);
    const paymentsPerYr = parseInt(paymentsPerYear);

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }
    if (isNaN(annualRate)) {
      setError("Please enter a valid interest rate.");
      return;
    }
    if (isNaN(termInYears) || termInYears <= 0) {
      setError("Please enter a valid loan term.");
      return;
    }
    if (isNaN(paymentsPerYr) || paymentsPerYr <= 0) {
      setError("Please enter valid number of payments per year.");
      return;
    }

    // Calculate payment details
    const totalPayments = termInYears * paymentsPerYr;
    const periodicRate = annualRate / paymentsPerYr;
    const payment =
      (principal * periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
      (Math.pow(1 + periodicRate, totalPayments) - 1);

    // Calculate totals
    const totalPaid = payment * totalPayments;
    const totalInterest = totalPaid - principal;

    // Calculate with extra payments if provided
    let actualPayments = totalPayments;
    let totalEarlyPayments = 0;
    if (extraPayments && !isNaN(parseFloat(extraPayments))) {
      const extra = parseFloat(extraPayments);
      totalEarlyPayments = extra * totalPayments;
      const adjustedPrincipal = principal - totalEarlyPayments;

      if (adjustedPrincipal > 0) {
        // Recalculate with reduced principal
        actualPayments = Math.ceil(
          Math.log(payment / (payment - adjustedPrincipal * periodicRate)) /
            Math.log(1 + periodicRate)
        );
      } else {
        actualPayments = 0;
      }
    }

    setResults({
      scheduledPayment: payment.toFixed(2),
      scheduledPayments: totalPayments,
      actualPayments: actualPayments,
      totalEarlyPayments: totalEarlyPayments.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      startDate: startDate || "Not specified",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20 lg:mt-24"
    >
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
        <div className="flex items-center space-x-2">
          <CalculatorIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Loan Calculator</h2>
        </div>
        <p className="text-sm opacity-90 mt-1">
          Calculate your loan payments and interest
        </p>
      </div>

      <div className="p-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan amount
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="Enter loan amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual interest rate (%)
            </label>
            <div className="relative">
              <ScaleIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="e.g., 13"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan period (in years)
            </label>
            <div className="relative">
              <ClockIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of payments per year
            </label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={paymentsPerYear}
                onChange={(e) => setPaymentsPerYear(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="e.g., 12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start date of loan
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Optional extra payments
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={extraPayments}
                onChange={(e) => setExtraPayments(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                placeholder="Extra amount"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculate Button */}
        <button
          onClick={calculateLoan}
          className="mt-6 w-full px-4 py-3 rounded-md text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center justify-center space-x-2 font-medium"
        >
          <span>Calculate</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 border-t pt-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Loan Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Scheduled payment</p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.scheduledPayment} Birr
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Scheduled number of payments
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.scheduledPayments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Actual number of payments
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.actualPayments}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total early payments</p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.totalEarlyPayments} Birr
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Total interest</p>
                  <p className="text-2xl font-bold text-green-600">
                    {results.totalInterest} Birr
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Start date of loan</p>
                  <p className="text-lg font-medium text-gray-700">
                    {results.startDate}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoanCalculator;
