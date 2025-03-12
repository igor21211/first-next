"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType>({
  range: { from: undefined, to: undefined },
  setRange: () => {},
  resetRange: () => {},
});
const initialRange = { from: undefined, to: undefined };

const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [range, setRange] = useState<DateRange>(initialRange);

  const resetRange = () => {
    setRange(initialRange);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};

export { ReservationProvider, useReservation };
