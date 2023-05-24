const intersectArrayWithSet = require("../src/intersectArray");

describe("intersectArrayWithSet", () => {
  describe("unique number in array [2, 4, 6, 8, 10], [1, 2, 3, 4, 5]", () => {
    it("should return [2,4]", () => {
      expect(intersectArrayWithSet([2, 4, 6, 8, 10], [1, 2, 3, 4, 5])).toEqual([
        2, 4,
      ]);
    });
  });

  describe("duplicate number in array [2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 2]", () => {
    it("should return [2,4]", () => {
      expect(
        intersectArrayWithSet([2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 2])
      ).toEqual([2, 4]);
    });
  });

  describe("no intersection [1, 3, 5], [2, 4, 6]", () => {
    it("should return []", () => {
      expect(intersectArrayWithSet([1, 3, 5], [2, 4, 6])).toEqual([]);
    });
  });

  describe("empty array [], [2, 4, 6]", () => {
    it("should return []", () => {
      expect(intersectArrayWithSet([], [2, 4, 6])).toEqual([]);
    });
  });
});
