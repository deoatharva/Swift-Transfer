import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const FileDownload = () => {
  const [code, setCode] = useState("");

  const handleDownload = async () => {
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("share_code", code)
      .single();

    if (error || !data) {
      alert("Invalid code");
      return;
    }

    // Get public URL
    const { data: fileData } = supabase.storage
      .from("files")
      .getPublicUrl(data.file_url);

    const fileUrl = fileData.publicUrl;

    // ⭐ Force download
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = data.file_name || "downloaded-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <input
        placeholder="Enter Share Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="form-control"
      />

      <button
        onClick={handleDownload}
        className="btn btn-success mt-3"
      >
        Download
      </button>
    </>
  );
};

export default FileDownload;
