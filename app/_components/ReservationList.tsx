"use client";
import ReservationCard from "@/app/_components/ReservationCard";
import { Booking } from "@/app/_lib/data-service";
import { deleteBooking } from "../_lib/action";
import { useOptimistic } from "react";

const ReservationList = ({ bookings }: { bookings: Booking[] }) => {
  const [optimisticBookings, updateOptimisticBookings] = useOptimistic(
    bookings,
    (prevBookings: Booking[], updatedBooking: number) => {
      return prevBookings.filter((booking) => booking.id !== updatedBooking);
    }
  );

  async function handleDelete(bookingId: number) {
    updateOptimisticBookings(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
