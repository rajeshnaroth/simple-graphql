const { requiredArg } = require("../requiredArg");

test("util: requiredArg()", () => {
  expect.assertions(1);
  try {
    requiredArg();
  } catch (error) {
    expect(true).toEqual(true);
  }
});
