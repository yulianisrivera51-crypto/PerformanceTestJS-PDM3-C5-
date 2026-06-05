import ReservationCard from "@components/ReservationCard";
import { getReservations } from "@services/reservation.service";
import { getSession, isAdmin } from "@/utils";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();
  const admin = isAdmin();

  try {
    const reservations = await getReservations();

    const filtered = admin
      ? reservations
      : reservations.filter((r) => r.userId === user.id);

    if (!filtered.length) {
      container.innerHTML = `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay reservas registradas</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered
      .map((r) => ReservationCard(r, admin))
      .join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-500">Error al cargar las reservas</p>
      </div>
    `;
  }
};
