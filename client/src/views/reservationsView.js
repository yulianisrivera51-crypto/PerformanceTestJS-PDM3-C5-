import Sidebar from "@/components/Sidebar";
import { getSession, isAdmin } from "@/utils";
import { reservationsController } from "@/controllers/reservations.controller";

export default function reservationsView() {
  const user = getSession();
  const admin = isAdmin();

  setTimeout(() => {
    reservationsController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Reservas</h1>
            <p class="text-slate-500 text-sm">
              ${admin ? "Gestión de todas las reservas" : "Tus reservas"}
            </p>
          </div>
          <button
            id="newReservationBtn"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            + Nueva Reserva
          </button>
        </div>

        <div
          id="reservationsContainer"
          class="grid gap-4 md:grid-cols-2"
        >
          <div class="w-full text-center py-8 col-span-2">
            <p class="text-slate-400">Cargando reservas...</p>
          </div>
        </div>

        <div id="formContainer"></div>

      </main>

    </div>
  `;
}
