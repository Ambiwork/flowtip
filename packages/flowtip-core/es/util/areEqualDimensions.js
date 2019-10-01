var areEqualDimensions = function areEqualDimensions(a, b) {
  if (a === b) return true;

  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  return a.width === b.width && a.height === b.height;
};

export default areEqualDimensions;
//# sourceMappingURL=areEqualDimensions.js.map