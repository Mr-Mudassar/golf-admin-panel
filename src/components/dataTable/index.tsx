import React, { memo } from "react";
import DataTable, {
  type TableColumn as DataTableColumn,
} from "react-data-table-component";
import { useSelector } from "react-redux";

export interface TableColumn<T> {
  name: string;
  sortable?: boolean;
  selector: (row: T) => string | number | React.ReactNode;
}

export interface DataTableComponentProps<T> {
  totalRows?: number;
  pagination?: boolean;
  allData: T[];
  expandableRows?: boolean;
  selectableRows?: boolean;
  userCursorPointer?: boolean;
  clearSelectedRows?: boolean;
  isOverflowVisible?: boolean;
  tableHeadings: TableColumn<T>[] | string[] | object[];
  ExpandedComponent?: React.FC<{ data: T }>;
  selectableRowDisabled?: (row: T) => boolean;
  onChangePage?: (page: number, totalRows: number) => void;
  onRowClicked?: (row: T, event: React.MouseEvent) => void;
  handleSelectedRowsChange?: (selected: {
    selectedRows: string[] | T[];
  }) => void;
  onChangeRowsPerPage?: (
    currentRowsPerPage: number,
    currentPage: number
  ) => void;
}

const DataTableComponent = <T,>({
  allData,
  totalRows,
  onChangePage,
  onRowClicked,
  tableHeadings,
  expandableRows,
  selectableRows,
  isOverflowVisible,
  ExpandedComponent,
  pagination = false,
  onChangeRowsPerPage,
  selectableRowDisabled,
  userCursorPointer = false,
  handleSelectedRowsChange,
}: DataTableComponentProps<T>) => {
  const AppMode = useSelector((state: any) => state.user.appMode);

  const customStyles = {
    header: {
      style: {
        zIndex: 1,
        fontSize: "14px",
      },
    },
    headCells: {
      style: {
        zIndex: 1,
        fontSize: "15px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        zIndex: 1,
        overflow: "auto",
        fontSize: "14px",
        fontWeight: "400",
        padding: "10px 0px",
        cursor: userCursorPointer ? "pointer" : "default",
      },
    },
    dataTables_scrollBody: {
      style: {
        overflow: isOverflowVisible ? "visible" : "hidden",
        position: "relative",
      },
    },
    tableWrapper: {
      style: {
        border: "1px solid lightGray",
        borderRadius: "14px 14px 0 0",
        overflow: "hidden",
      },
    },
    pagination: {
      style: {
        border: "1px solid lightGray",

        borderRadius: "0 0 14px 14px",
      },
    },
  };

  return (
    <div className="!overflow-x-auto !overflow-y-visible">
      <DataTable
        striped
        responsive
        data={allData}
        theme={AppMode}
        paginationServer
        highlightOnHover
        pagination={pagination}
        customStyles={customStyles}
        onRowClicked={onRowClicked}
        onChangePage={onChangePage}
        paginationTotalRows={totalRows}
        selectableRows={selectableRows}
        expandableRows={expandableRows}
        onChangeRowsPerPage={onChangeRowsPerPage}
        expandableRowsComponent={ExpandedComponent}
        selectableRowDisabled={selectableRowDisabled}
        onSelectedRowsChange={handleSelectedRowsChange}
        className="!overflow-y-visible !overflow-x-visible"
        paginationRowsPerPageOptions={[10, 20, 30, 50, 75, 100]}
        columns={tableHeadings as unknown as DataTableColumn<T>[]}
      />
    </div>
  );
};

export default memo(DataTableComponent);
