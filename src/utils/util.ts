const getImagePrefix = () => {
    return process.env.NODE_ENV === "production"
      ? "/7Smiles/"
        : "";
};

export { getImagePrefix };