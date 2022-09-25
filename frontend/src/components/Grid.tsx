import "./Grid.css";
import iconspotlight from "./icon-spotlight.png";

export interface GridProps {
  gridData: any[][];
}

export const Grid = (props: GridProps) => {
  if (!props.gridData) return null;

  const data: any[][] = props.gridData;

  return (
    <table>
      <tbody>
        {data.map((item, key) => {
          return <tr key={key}>{getColumns(item)}</tr>;
        })}
      </tbody>
    </table>
  );
};

const getColumns = (data: any[]) => {
  const columns = data.map((item, key) => {
    return (
      <td key={key} className={getCellStyle(item)}>
        {getCellElement(item)}
      </td>
    );
  });
  return columns;
};

const getCellStyle = (item: any): string => {
  if (item === 0) {
    return "light";
  } else if (item === 1) {
    return "wall";
  } else if (item === "X") {
    return "spotlight";
  }

  return "";
};

const getCellElement = (item: any) => {
  return item === "X" ? (
    <img src={iconspotlight} alt="spotligh" width={20} />
  ) : (
    item
  );
};
