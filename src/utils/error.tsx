const getError: any = (err: any) => {
  console.error('error called' + err);
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
};
export default getError;
