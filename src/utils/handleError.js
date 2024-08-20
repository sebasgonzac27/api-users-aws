export function handleError(error) {
  console.log(error);
  return {
    statusCode: 500,
    body: JSON.stringify({ message: error.message }),
  };
}
