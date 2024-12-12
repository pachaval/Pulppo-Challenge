import { useAtom } from "jotai";

import {
  operationRadioAtom,
  OperationRadioState,
} from "../atoms/operationRadioAtom";

const OperationRadio = () => {
  const [{ operation }, setOperation] =
    useAtom<OperationRadioState>(operationRadioAtom);
  return (
    <div className="flex-col">
      <div
        onClick={() => setOperation({ operation: "sale" })}
        className="flex items-center mb-4"
      >
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={operation === "sale"}
          type="radio"
          name="sale"
          id="sale"
        />
        <label
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="default-radio-1"
        >
          Venta
        </label>
      </div>
      <div
        onClick={() => setOperation({ operation: "rent" })}
        className="flex items-center"
      >
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={operation === "rent"}
          type="radio"
          name="rent"
          id="rent"
        />
        <label
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="default-radio-2"
        >
          Alquiler
        </label>
      </div>
    </div>
  );
};

export default OperationRadio;
