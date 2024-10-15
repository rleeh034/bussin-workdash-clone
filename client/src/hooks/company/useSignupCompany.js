import { useState } from "react";

export const useSignupCompany = () => {
  const [errorCompany, setErrorCompany] = useState(null);
  const [isSuccessCompany, setIsSuccessCompany] = useState(null);

  const signupCompany = async (name) => {
    setIsSuccessCompany(false);
    setErrorCompany(null);

    const response = await fetch("/api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsSuccessCompany(false);
      setErrorCompany(json.error);
    }
    if (response.ok) {
      // update loading state
      setIsSuccessCompany(true);
    }
  };

  return { signupCompany, isSuccessCompany, errorCompany };
};
