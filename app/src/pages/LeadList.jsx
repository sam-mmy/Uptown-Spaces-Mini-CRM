import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import { Link } from "react-router-dom";

function LeadList() {
  const [leads, setLeads] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
const [limit, setLimit] = useState(5);
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");

  const [sortBy, setSortBy] = useState("date_latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = async () => {
    try {
      const res = await getLeads({
        search,
        source,
        status,
        sortBy,
        page,
        limit
      });

      setLeads(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
}, [search, source, status, sortBy, page, limit]);

  return (
    <div className="page-container">
      {/* HEADER */}

      <div className="page-header">
        <h2>Leads</h2>

        <Link to="/create" className="primary-btn">
          + Create Lead
        </Link>
      </div>

      {/* TOOLBAR */}

      <div className="table-toolbar">
        {/* SEARCH */}

        <input
          placeholder="Search by name or phone..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* SOURCE FILTER */}

        <select
          className="filter-dropdown"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Sources</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="Referral">Referral</option>
        </select>

        {/* STATUS FILTER */}

        <select
          className="filter-dropdown"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Site Visit">Site Visit</option>
          <option value="Closed">Closed</option>
        </select>

        {/* DATE SORT */}

        <select
          className="filter-dropdown"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="date_latest">Newest</option>
          <option value="date_oldest">Oldest</option>
        </select>

        {/* SEARCH BUTTON */}

        <button
          onClick={() => {
            setSearch(searchInput);
            setPage(1);
          }}
        >
          Search
        </button>
      </div>

      {/* TABLE */}

      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>

             <th
  className="sortable-column"
  onClick={() => {

    if (sortBy === "budget_asc") {
      setSortBy("budget_desc");
    } else {
      setSortBy("budget_asc");
    }

    setPage(1);

  }}
>

  Budget

  <span className="sort-icon">

    {sortBy === "budget_asc"
      ? " ↑"
      : sortBy === "budget_desc"
      ? " ↓"
      : " ↕"}

  </span>

</th>

            <th>Location</th>
            <th>Source</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <Link to={`/leads/${lead.id}`} className="table-link">
                  {lead.name}
                </Link>
              </td>

              <td>{lead.phone}</td>

              <td>₹ {lead.budget}</td>

              <td>{lead.location}</td>

              <td>{lead.source}</td>

              <td>
                <span
                  className={`status ${lead.status.toLowerCase().replace(" ", "-")}`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}

      <div className="pagination">

  <div className="rows-per-page">

    Rows per page:

    <select
      value={limit}
      onChange={(e) => {

        setLimit(Number(e.target.value));
        setPage(1);

      }}
    >

      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>

    </select>

  </div>


  <span>

    Page {page} of {totalPages}

  </span>


  <div className="pagination-controls">

    <button
      className="pagination-btn"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      ◀
    </button>

    <button
      className="pagination-btn"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      ▶
    </button>

  </div>

</div>
    </div>
  );
}

export default LeadList;
