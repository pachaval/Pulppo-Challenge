import { useAtom } from "jotai";

import {
  OperationRadioState,
  operationRadioAtom,
} from "../atoms/operationRadioAtom";

const OperationRadio = () => {
  const [{ operation }, setOperation] =
    useAtom<OperationRadioState>(operationRadioAtom);

  const handleChange = (newOperation: "sale" | "rent") => {
    setOperation({ operation: newOperation });
  };

  return (
    <div className="flex-col">
      <div className="flex items-center mb-4">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={operation === "sale"}
          type="radio"
          name="operation"
          id="sale"
          onChange={() => handleChange("sale")}
        />
        <label
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="sale"
        >
          Venta
        </label>
      </div>
      <div className="flex items-center">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={operation === "rent"}
          type="radio"
          name="operation"
          id="rent"
          onChange={() => handleChange("rent")}
        />
        <label
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="rent"
        >
          Alquiler
        </label>
      </div>
    </div>
  );
};

export default OperationRadio;
