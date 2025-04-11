import React from "react";
import "../index.scss"; // Import the SCSS file

const PhoneInput = ({
  countryCode,
  phoneNumber,
  setCountryCode,
  setPhoneNumber,
}) => {
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="form__group field">
      <div className="phone-input-wrapper">
        <select
          className="country-code-dropdown"
          id="country_code"
          name="country_code"
          value={countryCode}
          onChange={handleCountryCodeChange}
          required
        >
          <option value="+880">+880 (Bangladesh)</option>
          <option value="+91">+91 (India)</option>
          {/* Add more country codes as needed */}
        </select>
        <input
          type="tel"
          className="form__field"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
        <label htmlFor="phone" className="form__label">
          Phone Number
        </label>
      </div>
    </div>
  );
};

export default PhoneInput;
