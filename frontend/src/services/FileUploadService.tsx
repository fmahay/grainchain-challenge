const upload = async (file: File): Promise<Response | void> => {
  let formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://grainchain-challenge.herokuapp.com/api/home/upload-file",
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};

export default upload;
