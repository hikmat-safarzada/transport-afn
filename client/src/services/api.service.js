

export async function getCars(searchParams = {}) {
  try {
    const params = new URLSearchParams(searchParams).toString();
    const url = `/api/cars${params ? `?${params}` : ""}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (e) {
    return { cars: [] };
  }
}

export async function getCarById(id) {
  try {
    const res = await fetch(`/api/cars/${id}`, { cache: "no-store" });
    const data = await res.json();
    return data
  } catch (error) {
    return null
  }
}

export async function createCar(formData) {
  try {
    const res = await fetch(`/api/cars`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Maşın əlavə edilərkən xəta baş verdi");
    }
    return data;
  } catch (error) {
    throw error;
  }
}


export async function deleteCar(id) {
  try {
    const res = await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Maşın silinərkən xəta baş verdi");
    }

    return data;
  } catch (error) {
    throw error;
  }
}


export async function updateCar(id, carData) {
  try {
    const res = await fetch(`/api/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Maşın yenilənərkən xəta baş verdi");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Çıxış edərkən xəta baş verdi");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}


export async function getMyCars() {
  try {
    const res = await fetch(`/api/cars/my-cars`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store"
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Maşınları çəkərkən xəta baş verdi");
    }

    return data;
  } catch (error) {
    return { cars: [] };
  }
}

export async function getOwnerReviews() {
    const res = await fetch(`/api/reviews/owner`, {
        credentials: "include",
        cache: "no-store"
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Review-ləri gətirmək mümkün olmadı");
    }

    return data;
}

export async function updateReview(id, reviewData){
  try {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(reviewData)
    })
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    throw error
  }
}

export async function getMyBookings() {
  try {
    const res = await fetch(`/api/bookings`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "İcarələri gətirmək mümkün olmadı"
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function cancelBooking(id) {
  try {
    const res = await fetch(`/api/bookings/${id}/cancel`, {
      method: "PUT",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "İcarə ləğv edilə bilmədi"
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOwnerBookings() {
    try {
        const res = await fetch(`/api/bookings/owner`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || "Booking-ləri gətirmək mümkün olmadı"
            );
        }

        return data;
    } catch (error) {
        throw error;
    }
}