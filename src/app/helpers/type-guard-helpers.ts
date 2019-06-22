export const checkStringProp = <T>(self: T, prop: string) => {
  return self.hasOwnProperty(prop) && typeof self[prop] === "string" && self[prop].length;
};
