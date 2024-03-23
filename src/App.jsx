import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    if (tableData.length) calculatePages();
  }, [tableData]);

  const start = useRef(0);
  const pages = useRef(0);

  const api_url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

  const fetchTableData = async () => {
    try {
      const resp = await fetch(api_url);
      const response = await resp.json();
      setTableData(response);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  const calculatePages = () => {
    let page = 0;
    if (tableData.length % 10 === 0) page = tableData.length / 10;
    else page = Math.floor(tableData.length / 10) + 1;
    pages.current = page;
    setCurrPage(1);
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pages !== 0 || tableData.length ? (
            tableData
              .map((table_item) => {
                return (
                  <tr key={table_item.id} className="row">
                    <td>{table_item.id}</td>
                    <td>{table_item.name}</td>
                    <td>{table_item.email}</td>
                    <td>{table_item.role}</td>
                  </tr>
                );
              })
              .slice(start.current, start.current + 10)
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <div className="button_container">
        <button
          className="button"
          onClick={() => {
            currPage > 1 &&
              ((start.current -= 10), setCurrPage((prevPage) => prevPage - 1));
          }}
        >
          Previous
        </button>
        {currPage !== 0 ? <span className="display">{currPage}</span> : []}
        <button
          className="button"
          onClick={() => {
            currPage < pages.current &&
              ((start.current += 10), setCurrPage((prevPage) => prevPage + 1));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
