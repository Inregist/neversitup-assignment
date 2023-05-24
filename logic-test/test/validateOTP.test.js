const validateOTP = require("../src/validateOTP");

describe("validateOTP", () => {
  describe("when otp is not a number", () => {
    it("should return false", () => {
      expect(validateOTP("abc")).toBe(false);
    });
  });

  describe("when otp is not 6 digits", () => {
    it("should return false 123", () => {
      expect(validateOTP(123)).toBe(false);
    });
  });

  describe("when otp has more than 2 pairs", () => {
    it("should return false 112233", () => {
      expect(validateOTP(112233)).toBe(false);
    });
    it("should return true 144663", () => {
      expect(validateOTP(144663)).toBe(true);
    });
  });

  describe("when otp has consecutive digits", () => {
    it("should return false 123212", () => {
      expect(validateOTP(123212)).toBe(false);
    });
    it("should return true 111212", () => {
      expect(validateOTP(111212)).toBe(true);
    });
  });

  describe("when otp is valid", () => {
    it("should return true 172839", () => {
      expect(validateOTP(172839)).toBe(true);
    });
    it("should return true 111762 ", () => {
      expect(validateOTP(111762)).toBe(true);
    });
    it("should return true 124578 ", () => {
      expect(validateOTP(124578)).toBe(true);
    });
    it("should return true 887712 ", () => {
      expect(validateOTP(887712)).toBe(true);
    });
  });

  describe("when otp is not valid", () => {
    it("should return false 17283", () => {
      expect(validateOTP(17283)).toBe(false);
    });
    it("should return false 118822 ", () => {
      expect(validateOTP(17283)).toBe(false);
    });
    it("should return false 123743", () => {
      expect(validateOTP(123743)).toBe(false);
    });
    it("should return false 321895 ", () => {
      expect(validateOTP(321895)).toBe(false);
    });
    it("should return false 112233", () => {
      expect(validateOTP(112233)).toBe(false);
    });
    it("should return false 882211", () => {
      expect(validateOTP(882211)).toBe(false);
    });
  });
});
