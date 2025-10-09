 import Cookies from "js-cookie";
   const baseUrl = import.meta.env.VITE_API_BASE_URL;

   const token = Cookies.get("jwtToken");

 export const handleDownload = async (id, fullName, skills, experience) => {
    try {
      const response = await fetch(`${baseUrl}/candidate/download/${id}`, {
        method: "GET",
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `[Techcombo_${fullName}_${skills.split(",").slice(0,3).join("_")}_${experience}]`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download CV.");
    }
  };