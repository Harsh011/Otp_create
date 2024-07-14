import { useEffect, useRef } from "react";
import { useState } from "react";

const Otp = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  // console.log(otpFields);
  const ref = useRef([]);

  console.log(ref);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    const copyfield = [...otpFields];
    if (key === "ArrowLeft") {
      ref.current[index - 1].focus();
    }

    if (key === "ArrowRight") {
      ref.current[index + 1].focus();
    }
    if (key === "Backspace") {
      //  console.log("Delete Number");
      copyfield[index] = "";
      setOtpFields(copyfield);
      if (index > 0) ref.current[index - 1].focus();
      return;
    }
    if (isNaN(key)) {
      return;
    }

    copyfield[index] = key;
    setOtpFields(copyfield);
    if (index + 1 < otpLength) ref.current[index + 1].focus();
    //  console.log(copyfield);
  };

  useEffect(() => {
    ref.current["0"].focus();
  }, []);
  return (
    <div>
      <h1>Enter OTP</h1>
      {otpFields.map((val, i) => {
        return (
          <input
            ref={(currRef) => (ref.current[i] = currRef)}
            type="text"
            key={i}
            value={val}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        );
      })}
    </div>
  );
};

export default Otp;
