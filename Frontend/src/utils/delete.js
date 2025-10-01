
   const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const handleDelete = async (id, onSuccess) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/candidate/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      alert("Candidate deleted successfully.");

      if(onSuccess) onSuccess();

    //   let newPage = pageNo;
    //   if (candidates.length === 1 && pageNo > 0) {
    //     newPage = pageNo - 1;
    //     setPageNo(newPage);
    //   }
    //   fetchData(0);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete candidate.");
    }
  };