import axios from "axios";
import "./styles.css";
import { useState, useEffect } from "react";

export default function Table() {
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(5);
  const [response, setResponse] = useState({});
  const [sortBy, setSortBy] = useState("ID");
  const [orderBy, setOrderBy] = useState("ASC");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/country?page=${pageNo}&searchString=${searchString}&columnName=${sortBy}&order=${orderBy}&listPerPage=${limit}`
      )
      .then((res) => setResponse(res.data));
  }, [pageNo, limit, sortBy, orderBy]);
  const data = response.data ?? [];

  const onLimitChange = (e) => setLimit(e.target.value);
  const onSortChange = (e) => setSortBy(e.target.value);
  const onOrderChange = (e) => setOrderBy(e.target.value);
  const onNextPage = () => setPageNo(pageNo + 1);
  const onPrevPage = () => setPageNo(pageNo - 1);
  const onSearchChange = (e) => setSearchString(e.target.value);

  const onSubmit = () => {
    axios
      .get(
        `http://localhost:8080/country?page=${pageNo}&searchString=${searchString}&columnName=${sortBy}&order=${orderBy}&listPerPage=${limit}`
      )
      .then((res) => setResponse(res.data));
  };

  return (
    <div className="Table" align="center">
      <div className="topFilter">
        Sort By:
        <select onChange={onSortChange}>
          <option>ID</option>
          <option>COUNTRY_NAME</option>
          <option>CAPITAL</option>
          <option>TIMEZONE</option>
        </select>
        Order By:
        <select onChange={onOrderChange}>
          <option>ASC</option>
          <option>DESC</option>
        </select>
        <input
          id="searchBar"
          type="text"
          placeholder="Search by Country Name"
          onChange={onSearchChange}
        ></input>
        <button onClick={onSubmit}>Search</button>
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th>COUNTRY NAME</th>
          <th>CAPITAL</th>
          <th>TIMEZONE</th>
        </tr>
        {data.map((val) => (
          <tr>
            <td>{val.ID}</td>
            <td>{val.COUNTRY_NAME}</td>
            <td>{val.CAPITAL}</td>
            <td>{val.TIMEZONE}</td>
          </tr>
        ))}
      </table>
      <div className="pagination">
        <select onChange={onLimitChange}>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        {response.page > 1 && <button onClick={onPrevPage}>&lt;</button>}
        <p style={{ marginRight: "10px", marginLeft: "10px" }}>
          Showing {data.length} of {response.totalRows} | Page {pageNo}
        </p>
        {response.totalPages > response.page && (
          <button onClick={onNextPage}>&gt;</button>
        )}
      </div>
    </div>
  );
}
