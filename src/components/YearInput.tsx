import { useEffect } from "react";
import useGameQueryStore from "../store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Get the current year
const currentYear = new Date().getFullYear();
const minYear = 1888;
const maxYear = currentYear;

// Define the schema with dynamic range
const schema = z.object({
  year: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val))
    .refine((val) => val >= minYear && val <= maxYear),
});

type FormData = z.infer<typeof schema>;

const YearInput = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { year: undefined },
  });

  const setParamYear = useGameQueryStore((s) => s.setYear);
  const yearParam = useGameQueryStore((s) => s.gameQuery.year);

  // Reset the form and the store when yearParam is set
  useEffect(() => {
    if (yearParam) {
      setValue("year", yearParam);
    }
  }, [yearParam, setValue]);

  const onSubmit = (data: FormData) => {
    setParamYear(data.year);
    console.log("submit");
  };

  const handleReset = () => {
    setParamYear(null);
    reset();
  };

  const yearPlaceholder = yearParam
    ? `Year: ${yearParam}`
    : `Enter a year between ${minYear} and ${maxYear}`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-test"
          type="number"
          min={minYear}
          max={maxYear}
          placeholder={yearPlaceholder}
          {...register("year")}
        />
        <button type="submit" style={{ display: "none" }} />
        {yearParam && (
          <button type="button" onClick={handleReset}>
            Reset Year
          </button>
        )}
      </form>
    </div>
  );
};

export default YearInput;
