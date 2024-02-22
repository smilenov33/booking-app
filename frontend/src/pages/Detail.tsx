import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AiFillStar } from "react-icons/ai";

import { getHotelById } from "../api-client";
import GuestInfo from "../forms/GuestInfoForm/GuestInfo";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "getHotelById",
    () => getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex ">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-400" key={i} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image, i) => (
          <div className="h-[300px]" key={"image" + i}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility, i) => (
          <div
            className="border border-slate-300 rounded-sm p-3"
            key={"facility" + i}
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
