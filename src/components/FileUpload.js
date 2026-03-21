import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [expireAt, setExpireAt] = useState("");
  const [shareCode, setShareCode] = useState("");

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleUpload = async () => {
  if (!file) return;

  const code = generateCode();

  // ✅ Clean filename (VERY IMPORTANT)
  const cleanName = file.name.replace(/\s+/g, "-");

  // ✅ Always use a folder
  const filePath = `uploads/${code}-${cleanName}`;

  // ✅ Upload file
  const { data, error } = await supabase.storage
    .from("files")
    .upload(filePath, file);

  if (error) {
    console.log("Upload error:", error);
    return;
  }

  // ✅ Get user safely
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("User error:", userError);
    return;
  }

  // ✅ Save metadata
  const { error: dbError } = await supabase.from("files").insert([
    {
      file_name: file.name,
      file_url: data.path,
      expire_at: expireAt || null,
      share_code: code,
      user_id: user.id,
    },
  ]);

  if (dbError) {
    console.log("DB error:", dbError);
    return;
  }

  setShareCode(code);
};

  return (
    <>
      
      <label className="file-label">
      {file ? file.name : "Choose File"}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        hidden
      />
    </label>

      <input
      type="datetime-local"
      className="form-control custom-input"
      value={expireAt}
      onChange={(e) => setExpireAt(e.target.value)}
    />

      <button onClick={handleUpload} className="btn btn-primary mt-2">
        Upload
      </button>

      {shareCode && (
        <div className="alert alert-success mt-3">
          Share Code: <strong>{shareCode}</strong>
          <button
            className="btn btn-sm btn-outline-dark ms-2"
            onClick={() => navigator.clipboard.writeText(shareCode)}
          >
            Copy
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
