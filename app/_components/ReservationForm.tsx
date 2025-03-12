"use client";

import { useReservation } from "./ReservationContext";
import { BookingData, Cabin } from "@/app/_lib/data-service";
import { differenceInDays } from "date-fns";
import { User } from "next-auth";
import { createBooking } from "../_lib/action";
import UpdateButton from "./UpdateButton";

function ReservationForm({ cabin, user }: { cabin: Cabin; user: User }) {
  const { range } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData: BookingData = {
    cabinId: id,
    startDate: startDate ? startDate.toISOString() : "",
    endDate: endDate ? endDate.toISOString() : "",
    cabinPrice,
    numNights,
    numGuests: 1,
    guestId: Number(user.guestId),
  };

  const handleSubmit = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image || ""}
            alt={user.name || "User avatar"}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          {numNights > 0 && (
            <UpdateButton pendingLabel="Reserving...">Reserve now</UpdateButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
