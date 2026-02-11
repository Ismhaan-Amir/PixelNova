import React, { useState } from "react";
import { Check, X, Info, CreditCard, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";

const EXTENDED_PRICING = {
  monthly: { price: "$10", period: "/ Monthly" },
  yearly: { price: "$100", period: "/ Yearly" },
  lifetime: { price: "$500", period: "/ Lifetime" },
};


export default function Pricing() {
  const [step, setStep] = useState("pricing"); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      features: [
        { label: "43 AI Document Templates", included: true },
        { label: "1,000 Words per month", included: true },
        { label: "5 Images per month", included: true },
        { label: "0 Characters for Text to Speech", included: true },
        { label: "1 Speech to Text per month", included: true },
        { label: "2 MB Audio file size limit", included: true },
        { label: "AI Chat", included: true },
        { label: "3 AI Chat Bots", included: true },
        { label: "AI Code", included: true },
        { label: "Hide Ads", included: false },
        { label: "Live Chat Support", included: true },
        { label: "Free Setup", included: false },
        { label: "Free Support", included: false },
      ],
    },
    {
      name: "Trial Plan",
      price: "Trial",
      features: [
        { label: "56 AI Document Templates", included: true },
        { label: "1,000 Words per month", included: true },
        { label: "10 Images per month", included: true },
        { label: "0 Characters for Text to Speech", included: true },
        { label: "2 Speech to Text per month", included: true },
        { label: "5 MB Audio file size limit", included: true },
        { label: "AI Chat", included: true },
        { label: "5 AI Chat Bots", included: true },
        { label: "AI Code", included: true },
        { label: "Hide Ads", included: false },
        { label: "Live Chat Support", included: true },
        { label: "Free Setup", included: true },
        { label: "Free Support", included: false },
      ],
    },
    {
      name: "Extended Plan",
      recommended: true,
      features: [
        { label: "56 AI Document Templates", included: true },
        { label: "Unlimited Words per month", included: true },
        { label: "Unlimited Images per month", included: true },
        { label: "Unlimited Characters for Text to Speech", included: true },
        { label: "Unlimited Speech to Text per month", included: true },
        { label: "Unlimited Audio file size limit", included: true },
        { label: "AI Chat", included: true },
        { label: "13 AI Chat Bots", included: true },
        { label: "AI Code", included: true },
        { label: "Hide Ads", included: true },
        { label: "Live Chat Support", included: true },
        { label: "Free Setup", included: true },
        { label: "Free Support", included: true },
      ],
    },
  ];

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setStep("checkout");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2500);
  };

  const resetFlow = () => {
    setStep("pricing");
    setSelectedPlan(null);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-[#00d67d] rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-green-100">
                <CheckCircle2 className="w-12 h-12 text-white" />
             </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 mb-8">Your {selectedPlan?.name} is now active. Thank you for your purchase.</p>
          <button 
            onClick={resetFlow}
            className="w-full py-4 bg-[#00d67d] text-white font-bold rounded-lg hover:bg-[#00c271] transition-all transform active:scale-95"
          >
            Return to Pricing
          </button>
        </div>
      </div>
    );
  }

  if (step === "checkout") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setStep("pricing")}
            className="text-sm text-gray-400 mb-6 hover:text-gray-600 flex items-center gap-1"
          >
            ← Back to plans
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pay with card</h2>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="test@test.com"
                required
                className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment method</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="p-4 flex items-center gap-3 border-b border-gray-200">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="1234 1234 1234 1234" 
                    className="flex-1 outline-none text-gray-800"
                    required
                  />
                  <div className="flex gap-1">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 rounded">VISA</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded">MC</span>
                  </div>
                </div>
                <div className="flex divide-x divide-gray-200">
                  <input 
                    type="text" 
                    placeholder="MM / YY" 
                    className="w-1/2 p-4 outline-none text-gray-800" 
                    required
                  />
                  <div className="w-1/2 p-4 flex items-center">
                    <input 
                      type="text" 
                      placeholder="CVC" 
                      className="flex-1 outline-none text-gray-800"
                      required
                    />
                    <Info className="w-4 h-4 text-gray-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder name</label>
              <input 
                type="text" 
                className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Full name on card"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country or region</label>
              <div className="relative">
                <select className="w-full text-black appearance-none px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Pakistan</option>
                  <option>China</option>
                  <option>Korea</option>
                  <option>Turkey</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                isProcessing ? 'bg-[#00d67d]' : 'bg-[#0029ff] hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ${selectedPlan?.name === "Extended Plan" ? EXTENDED_PRICING[billingCycle].price : (selectedPlan?.price || "")}`
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 mt-4">
              <span>Powered by stripe</span>
              <span>•</span>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl text-[#020618] font-bold mb-4">
          Our Pricing Plans
        </h2>
        <p className="text-gray-500 mb-10">
          We offer flexible pricing plans to suit your needs.
        </p>

        <div className="flex justify-center gap-6 mb-12 text-sm font-medium text-black">
          {["monthly", "yearly", "lifetime"].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="billing"
                checked={billingCycle === type}
                onChange={() => setBillingCycle(type)}
                className="mr-2 accent-teal-600 w-4 h-4"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>

        <div className="grid md:grid-cols-3 border border-gray-200 rounded-xl overflow-hidden bg-white text-[#020618]">
          {plans.map((plan, i) => {
            const isExtended = plan.name === "Extended Plan";

            return (
              <div
                key={i}
                className={`p-8 flex flex-col border-r last:border-r-0 border-gray-100 ${
                  plan.recommended
                    ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] scale-105 z-10 rounded-xl"
                    : ""
                }`}
              >
                {plan.recommended && (
                  <div className="text-xs font-bold text-white bg-teal-600 py-2 mb-6 rounded-sm uppercase tracking-wider">
                    Recommended
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-6 text-left">
                  {plan.name}
                </h3>

                <div className="bg-gray-50 py-6 text-3xl font-bold mb-8 rounded-lg flex items-baseline justify-center gap-1">
                  {isExtended
                    ? EXTENDED_PRICING[billingCycle].price
                    : plan.price}

                  {isExtended && (
                    <span className="text-sm font-normal text-gray-400 italic">
                      {EXTENDED_PRICING[billingCycle].period}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8 text-sm text-left">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center group"
                    >
                      <div className="flex items-center">
                        {f.included ? (
                          <div className="bg-green-100 p-0.5 rounded mr-2">
                             <Check className="w-3 h-3 text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-red-50 p-0.5 rounded mr-2">
                             <X className="w-3 h-3 text-red-400" />
                          </div>
                        )}
                        <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                          {f.label}
                        </span>
                      </div>
                      <Info className="w-3 h-3 text-gray-300 group-hover:text-gray-400 transition-colors" />
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleChoosePlan(plan)}
                  on
                  className={`mt-auto py-3 rounded-lg border-2 font-bold transition-all ${
                    plan.recommended 
                    ? "bg-teal-600 border-teal-600 text-white hover:bg-teal-700" 
                    : "border-teal-600 text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}