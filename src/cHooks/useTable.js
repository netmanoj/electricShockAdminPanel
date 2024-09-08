import { useContext, useEffect } from 'react';
import { TableContext } from '../context/tableContext';

const useTable = () => {
  
  const {
    editRowIndex,
    setEditRowIndex,
    editedRow,
    setEditedRow,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    totalPages,
    setTotalPages,
    csvData,
    setCsvData,
    isShow,
    setIsShow,
    setClickedId,
  } = useContext(TableContext);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle row edit
  const handleEditClick = (index, row) => {
    setEditRowIndex(index);
    setEditedRow({ ...row });
  };

  // Handle save after edit
  const handleSaveClick = () => {
    const id = parseInt(editedRow.ID) - 1;
    const loadApplied = parseFloat(editedRow['Load_Applied (in KV)']);

    if (isNaN(loadApplied) || loadApplied > 200) {
      alert('Load cannot be more than 200');
    } else {
      const updatedData = [...csvData];
      updatedData[id] = editedRow;
      setCsvData(updatedData);
    }
    setEditRowIndex(null);
    alert(`Row ${id + 1} has been updated successfully`);
  };

  // Handle input change during edit
  const handleChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  // Handle popup open/close
  const handlePopup = (id) => {
    setIsShow(!isShow);
    setClickedId(parseInt(id));
  };

  // Update total pages
  useEffect(() => {
    setTotalPages(Math.ceil(csvData.length / rowsPerPage));
  }, [csvData, rowsPerPage, setTotalPages]);

  // Calculate current rows for pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = csvData.slice(indexOfFirstRow, indexOfLastRow);

  return {
    currentRows,
    totalPages,
    currentPage,
    handlePageChange,
    editRowIndex,
    editedRow,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePopup,
    isShow,
  };
};

export default useTable;
