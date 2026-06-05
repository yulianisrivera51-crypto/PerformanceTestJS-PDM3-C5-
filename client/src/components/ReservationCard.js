import { translateStatus, statusColor } from "@/utils";

export default function ReservationCard(reservation, isAdmin = false) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;

  return `
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">

      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg">${workspace}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${statusColor(status)}">
          ${translateStatus(status)}
        </span>
      </div>

      <div class="text-sm text-slate-600 space-y-1">
        <p>📅 ${date}</p>
        <p>🕐 ${startHour} - ${endHour}</p>
        <p>📝 ${reason}</p>
      </div>

      <div class="flex gap-2 mt-4">
        ${
          status === "pending"
            ? `
              <button
                class="edit-reservation-btn text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
                data-id="${id}">
                Editar
              </button>
              <button
                class="delete-reservation-btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                data-id="${id}">
                ${isAdmin ? "Eliminar" : "Cancelar"}
              </button>
            `
            : ""
        }
        ${
          isAdmin && status === "pending"
            ? `
              <button
                class="approve-btn text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition cursor-pointer"
                data-id="${id}">
                Aprobar
              </button>
              <button
                class="reject-btn text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition cursor-pointer"
                data-id="${id}">
                Rechazar
              </button>
            `
            : ""
        }
      </div>

    </article>
  `;
}
