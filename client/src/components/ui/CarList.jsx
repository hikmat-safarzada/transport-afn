"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CarCard from "./CarCard";
import CarNotFound from "./CarNotFound";


export default function CarList({ page = 1, setTotalPages }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(
          searchParams.toString()
        );

        params.set("page", page);
        params.set("limit", 12);

        const res = await fetch(
          `/api/cars?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error(`Status: ${res.status}`);
        }

        const data = await res.json();

        let carList = [];

        if (Array.isArray(data)) {
          carList = data;
        } else if (Array.isArray(data.cars)) {
          carList = data.cars;
        } else if (Array.isArray(data.data)) {
          carList = data.data;
        }

        setCars(carList);

        if (setTotalPages) {
          if (data.pagination?.totalPages) {
            setTotalPages(
              data.pagination.totalPages
            );
          } else if (data.total) {
            setTotalPages(
              Math.ceil(data.total / 12)
            );
          } else {
            const calculatedPages =
              Math.ceil(carList.length / 12);

            setTotalPages(
              calculatedPages > 0
                ? calculatedPages
                : 1
            );
          }
        }

      } catch (error) {

        setCars([]);

        if (setTotalPages) {
          setTotalPages(1);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchCars();

  }, [page, searchParams, setTotalPages]);


  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">

        <div
          className="
            w-10
            h-10
            border-4
            border-gray-200
            border-t-[#F36F20]
            rounded-full
            animate-spin
          "
        />

      </div>
    );
  }

  if (cars.length === 0) {
    return <CarNotFound />;
  }


  return (
    <div className="w-full">

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        "
      >

        {cars.map((car) => (
          <CarCard
            key={car._id || car.id}
            car={car}
          />
        ))}

      </div>

    </div>
  );
}