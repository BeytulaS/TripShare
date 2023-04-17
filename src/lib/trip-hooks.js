import { useState, useEffect } from "react";
import { supaClient } from "../lib/supa-client";

export const useTrip = (tripId) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      const { data: tripData, error } = await supaClient
        .from("shared_trips")
        .select("*")
        .eq("id", tripId)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setTrip(tripData);
      setLoading(false);
    };

    fetchTrip();
  }, [tripId]);

  return { trip, loading };
};
