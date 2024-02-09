import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";

const Images = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const imageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      imageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <div className="border-2 rounded p-4 flex-col gap-4">
        {imageUrls && (
          <div className="grid grid-cols-6 gap-4 mb-2">
            {imageUrls.map((url, i) => (
              <div className="relative group" key={i}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 text-white group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (imageUrls?.length || 0);
              if (!totalLength) {
                return "At least one image";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default Images;
