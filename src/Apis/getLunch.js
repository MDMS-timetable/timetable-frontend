import axios from "axios";

const getLunch = async (start, end) => {
  const response = await axios.get(
    "https://mdmsback.anys.kro.kr/lunch/mealinfo",
    // "http://localhost:3000/lunch/mealinfo",
    {
      params: {
        start,
        end,
      },
    }
  );
  return response.data;
};

export default getLunch;
