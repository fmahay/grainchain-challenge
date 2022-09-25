const upload = async (file: File): Promise<Response | void> => {
  let formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5001/api/home/upload-file", {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export default upload;
