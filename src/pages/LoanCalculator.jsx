import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const calculateLoan = () => {
    // Reset error and results
    setError("");
    setResults(null);

    // Parse inputs
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termInMonths = parseInt(loanTerm) * 12;

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      setError("Please enter a valid interest rate.");
      return;
    }
    if (isNaN(termInMonths) || termInMonths <= 0) {
      setError("Please enter a valid loan term.");
      return;
    }

    // Calculate monthly payment
    const monthlyRate = annualRate / 12;
    const numberOfPayments = termInMonths;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate total interest and total cost
    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - principal;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalPaid.toFixed(2),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white/95 backdrop-blur-md shadow-lg rounded-lg p-6 mt-20 lg:mt-24"
    >
      <div className="flex items-center space-x-2 mb-6">
        <CalculatorIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Loan Calculator</h2>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount ($)
          </label>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 text-gray-500 absolute left-3" />
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
              placeholder="e.g., 10000"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <div className="flex items-center">
            <ChartBarIcon className="w-5 h-5 text-gray-500 absolute left-3" />
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
              placeholder="e.g., 5.5"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (Years)
          </label>
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 text-gray-500 absolute left-3" />
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
              placeholder="e.g., 5"
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
        className="mt-6 w-full px-4 py-2 rounded-full text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center justify-center space-x-2"
      >
        <CalculatorIcon className="w-5 h-5" />
        <span>Calculate</span>
      </button>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Loan Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Monthly Payment:</span> $
                {results.monthlyPayment}
              </p>
              <p>
                <span className="font-medium">Total Interest Paid:</span> $
                {results.totalInterest}
              </p>
              <p>
                <span className="font-medium">Total Cost of Loan:</span> $
                {results.totalCost}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoanCalculator;
