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

    // Upload file
    const { data, error } = await supabase.storage
      .from("files")
      .upload(`public/${code}-${file.name}`, file, { upsert: true });

    if (error) {
      console.log(error);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Save metadata
    await supabase.from("files").insert([
      {
        file_name: file.name,
        file_url: data.path,
        expire_at: expireAt,
        share_code: code,
        user_id: user.id,
      },
    ]);

    setShareCode(code);
  };

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <input
        type="datetime-local"
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
