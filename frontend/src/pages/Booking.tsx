import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import BookingForm from "../forms/BookingForm/BookingForm";
import BookingSummary from "../components/BookingSummary";

import { useSearchContext } from "../contexts/SearchContext";
import { useAppContext } from "../contexts/AppContext";

import { createPaymentIntent, getHotelById, getUser } from "../api-client";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const { data: hotel } = useQuery(
    "getHotelById",
    () => getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: user } = useQuery("getUser", getUser);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!hotel) {
    return <>Not Existing Hotel</>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] space-x-5">
      <BookingSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {user && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm user={user} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
