import axios from "axios";

const getLunch = async (start, end) => {
  const response = await axios.get(
    "https://port-0-timetable-backend-kvmh2mlk183p67.sel4.cloudtype.app/lunch/mealinfo",
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
