import React from "react";

import { TableProps } from "./types";
import EmptyView from "../empty";

const Table: React.FC<TableProps> = ({
  data,
  listingLabel = "",
  emptyStateTitle = "No data",
  onValueClick,
}) => {
  return (
    <>
      {data.values.length ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {!!listingLabel && <th scope="col">#</th>}
                {data.labels.map((label, index) => (
                  <th key={index} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.values.map((value, index) => (
                <tr key={index}>
                  <>
                    {!!listingLabel && <th scope="row">{index + 1}</th>}
                    {value.map((val, key) => (
                      <td key={key} onClick={() => onValueClick?.(key, value)}>
                        {val}
                      </td>
                    ))}
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyView
          title={emptyStateTitle}
          icon="table"
          iconSize={48}
        ></EmptyView>
      )}
    </>
  );
};

export default Table;
