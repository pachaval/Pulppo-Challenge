import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { Casa, Departamento, roofedSurface } = payload[0].payload;

    return (
      <div className="border border-gray-300 bg-white p-2.5">
        <p className="m-0 font-bold">
          {Casa !== undefined ? "Casa" : "Departamento"} de {roofedSurface}m²
        </p>
        {Casa !== undefined && (
          <>
            <p>Total: ${Casa}</p>
            <p>Precio por m2: ${(Casa / roofedSurface).toFixed(0)}</p>
          </>
        )}
        {Departamento !== undefined && (
          <>
            <p>Total: ${Departamento}</p>
            <p>Precio por m2: ${(Departamento / roofedSurface).toFixed(0)}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
