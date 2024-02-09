import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { getMyHotelById, updateMyHotelById } from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: hotel } = useQuery(
    "getMyHotelById",
    () => getMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(updateMyHotelById, {
    onSuccess: async () => {
      showToast({ message: "Hotel Updated!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
