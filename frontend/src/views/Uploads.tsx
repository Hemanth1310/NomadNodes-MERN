import React, { useState, type ChangeEvent } from "react";

const Uploads = () => {
  const [fileList, setFileList] = useState<FileList | null>();
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const [errors,setErrors] = useState({
    title:   '',
    coordinates: '',
    content:'',
    visitDate:'',       // validates "YYYY-MM-DD" string
    tags:'',
    imageURL:''    
  })
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    console.log(e.target.files);
    const files = e.target.files;
    const urls: string[] = [];
    let totalBytes = 0;
    if (files && files.length > 0) {
      for (let i = 0; i < files?.length; i++) {
        urls.push(URL.createObjectURL(files[i]));
        totalBytes += files[i].size;
      }
    }
    const formatedBytes = totalBytes / (1024 * 1024);
    setTotalSize(Number(formatedBytes.toFixed(2)));
    setFileList(files);
    setPreviews(urls);
    setIsUploading(false);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    console.log(fileList);
  };
  return (
    <div className="w-full h-full pt-5 flex flex-col sm:pl-10 sm:pr-10">
      {/* {Array.from(Array(26)).map(()=><div className='h-10 bg-amber-600'></div>)} */}
      <h1 className="text-2xl sm:text-4xl mb-5 sm:mb-10">
        Upload your Nomadic post here
      </h1>
      <div className="flex h-full">
        <form
          className="flex-1 w-full h-full flex flex-col gap-5  items-center rounded-2xl"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="images"
            className="flex flex-col w-full h-1/2 items-center justify-center border-2 border-dashed border-orange-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer p-4"
          >
            <input
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFile}
              disabled={isUploading}
              className="hidden"
            />
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                Click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF</p>
            </div>
          </label>
          <div className="w-full flex flex-wrap gap-5">
            {previews.map((src) => (
              <img
                key={src}
                src={src}
                className="h-30 max-w-60 object-fill rounded-2xl"
              ></img>
            ))}
          </div>
          {totalSize > 0 && (
            <p>
              Total size is <b>{totalSize} mb</b>.
            </p>
          )}
          <button
            disabled={isUploading}
            type="submit"
            className="text-xl pr-15 pl-15 p-2 bg-mist-800 text-white text-center rounded-2xl disabled:bg-gray-400 hover:bg-gray-400"
          >
            Submit
          </button>
        </form>
        <form className="flex-1 flex flex-col w-full items-center gap-5 pr-5 pl-5">
          <div className="w-full">
            <input
              className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
              name="title"
              type="text"
              placeholder="Enter title"
            />
            {errors.title && (
              <div className="text-sm font-light text-red-800 pl-2">{errors.email}</div>
            )}
            </div>
            <div className="w-full">
            <input
              className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
              name="coordinates"
              type="text"
              placeholder="Enter coordinates"
            />
            {errors.coordinates && (
              <div className="text-sm font-light text-red-800 pl-2">{errors.email}</div>
            )}
            </div>
            <div className="w-full">
            <input
              className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
              name="content"
              type="text"
              placeholder="Enter content"
            />
            {errors.content && (
              <div className="text-sm font-light text-red-800 pl-2">{errors.email}</div>
            )}
            </div>
            <div className="w-full">
            <input
              className="w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl"
              name="visitDate"
              type="date"
              placeholder="Enter visitDate"
            />
            {errors.visitDate && (
              <div className="text-sm font-light text-red-800 pl-2">{errors.email}</div>
            )}
            </div>
            
          <button
            disabled={isUploading}
            type="submit"
            className="text-xl pr-15 pl-15 p-2 bg-mist-800 text-white text-center rounded-2xl disabled:bg-gray-400 hover:bg-gray-400"
          >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Uploads;
