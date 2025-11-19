

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resumeApi } from "../../../api/resumeApi";
import Pagination from "../../../components/common/Pagination/Pagination";
import FilterSummary from "../../../components/advancedFilter/FilterSummary/FilterSummary";
import CandidateCard from "../../../components/CandidateCard/CandidateCard";
import BackToTop from "../../../components/common/BackToTop/BackToTop"



const FilteredCandidatesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(parseInt(query.get("page")) || 0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCandidates, setTotalCandidates] = useState(0);

    const searchKeyword = query.get("keyword") || "";

    const filters = {
        page,
        size: query.get("size") || 10,
        keyword: searchKeyword,
        experience: query.get("experience") || "",
        company: query.getAll("company"),
        education: query.getAll("education"),
        designation: query.getAll("designation"),
        location: query.getAll("location"),
    };

    const updateURL = (newPage) => {
        const params = new URLSearchParams(location.search);
        params.set("page", newPage);
        navigate(`/filtered?${params.toString()}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await resumeApi(filters);
                setCandidates(res.data.content);
                setTotalPages(res.data.totalPages || 0);
                setTotalCandidates(res.data.totalElements || 0);
            } catch (err) {
                console.error("Fetch Error:", err);
            }
            setLoading(false);
        };
        fetchData();
    }, [page, location.search]);

    return (
        <div className="w-full flex justify-center mt-6 mb-10">
            <div className="w-full max-w-4xl px-4">

                 <h2 className="text-2xl font-bold text-gray-800 mb-2 px-2">
                    Filtered Candidates
                 </h2>

                {/* Filters Summary */}

                <FilterSummary
                    totalCandidates={totalCandidates}
                    filters={filters}
                    searchKeyword={searchKeyword}
                    location={location}
                    navigate={navigate}
                /> 

                {/* Loader */}
                {loading && <p className="text-gray-500">Loading...</p>}

                {/* No Data */}
                {!loading && candidates.length === 0 && (
                    <p className="text-red-600">No candidates found</p>
                )}

                {/* Candidate Cards */}
                <div className="flex flex-col gap-6 mt-6">
                    {candidates.map((c) => (
                      
                        <CandidateCard
                            key={c.id}
                            c={c}
                            searchKeyword={searchKeyword}
                            navigate={navigate}
                        />
                    ))}
                </div>

                <BackToTop/>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                            updateURL(newPage);
                              window.scrollTo({ top: 0, behavior: "smooth" });

                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default FilteredCandidatesPage;
