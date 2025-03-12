import { getBooking, Booking, getCabin, Cabin } from "@/app/_lib/data-service";
import { updateBooking as updateBookingAction } from "@/app/_lib/action";
import UpdateButton from "@/app/_components/UpdateButton";
type Params = Promise<{ bookingsId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { bookingsId } = await params;
  const booking = await getBooking(parseInt(bookingsId));
  if (!booking) {
    return {
      title: "Booking not found",
      description: "Booking not found",
    };
  }
  return {
    title: `Edit Reservation ${booking.id}`,
    description: `Edit Reservation ${booking.id}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { bookingsId } = await params;
  const booking: Booking | null = await getBooking(parseInt(bookingsId));
  const cabin: Cabin | null = await getCabin(booking?.cabinId);
  const maxCapacity = cabin?.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingsId}
      </h2>

      <form
        action={updateBookingAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="bookingId" value={booking?.id} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={booking?.numGuests}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking?.observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateButton>Update reservation</UpdateButton>
        </div>
      </form>
    </div>
  );
}
