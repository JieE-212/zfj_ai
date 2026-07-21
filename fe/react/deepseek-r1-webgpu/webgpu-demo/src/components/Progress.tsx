
const Progress = ({ text, percentage, total }) => {
  console.log(text, percentage, total);
  percentage ??= 0;
  return (
    <div>
      <p>{text}</p>
      <p>{percentage}%</p>
      <p>{total}</p>
    </div>
  )
}