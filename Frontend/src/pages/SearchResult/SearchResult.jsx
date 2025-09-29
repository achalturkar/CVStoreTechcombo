import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Common/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import { SearchContext } from "../../context/searchContext";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const { keyword, setKeyword, filter } = useContext(SearchContext);
  const location = useLocation();
  const navigate = useNavigate();

    const [submittedKeyword, setSubmittedKeyword] = useState("");



  // ✅ Sync context keyword when URL param changes
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const urlKeyword = params.get("keyword");
  //   if (urlKeyword !== keyword) {
  //     setKeyword(urlKeyword);
  //   }
  // }, [location.search,  setKeyword]);

  // ✅ Sync URL param when keyword in context changes (user searches again)
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const currentUrlKeyword = params.get("keyword");
  //   if (keyword && keyword !== currentUrlKeyword) {
  //     params.set("keyword", keyword);
  //     navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  //   }
  // }, [ location, navigate]);

  // ✅ Build query params
  const queryParams = new URLSearchParams({
    keyword: keyword,
    page,
    size: 10,
    ...filter,
  }).toString();

  // ✅ Fetch candidates
  const fetchData = () => {
    fetch(`http://localhost:8080/api/candidate/search/filter?${queryParams}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    fetchData();
  }, [ keyword, page, filter]);

  return (
    <div className="p-6">
      <Filter />
      <h2 className="text-xl font-bold mb-4">
        Search Results for "{keyword}" ({totalElements} found)
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((c) => (
            <div
              key={c.id}
              className="p-4 border rounded-lg shadow bg-white hover:shadow-md transition"
              onClick={() => navigate(`/candidate/${c.id}`)}
            >
              <h3 className="font-bold">{c.fullName}</h3>
              <p className="text-sm text-gray-600">
                {c.email} | {c.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                Skills: {c.skills?.split(",").slice(0, 5).join(", ")}
              </p>
              <p className="text-sm text-gray-600">Company: {c.company}</p>
              <p className="text-sm text-gray-600">Experience: {c.experience}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default SearchResult;
