import { addDays, subDays } from "date-fns";
import { useQuery } from "react-query";
import getLunch from "../Apis/getLunch";

const useLunchQuery = (date) => {
  const start = subDays(date, 1);

  const end = addDays(date, 1);

  const { data } = useQuery({
    queryKey: ["lunch", date.getFullYear(), date.getMonth(), date.getDate()],
    queryFn: () => getLunch(start, end),
  });

  // // console.log("data");
  // // console.log(data);

  return { data };
};

export default useLunchQuery;
