interface LabelProps {
  innerRadius: number;
  outerRadius: number;
  midAngle: number;
  value: number;
  cy: number;
  cx: number;
}

const RADIAN = Math.PI / 180;

const CustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill="white"
      x={x}
      y={y}
    >
      {`$${Math.round(value)}`}
    </text>
  );
};

export default CustomizedLabel;
