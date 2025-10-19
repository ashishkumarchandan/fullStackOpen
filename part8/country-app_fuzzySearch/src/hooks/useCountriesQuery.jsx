import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../services/countries";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 10,
  });
};
