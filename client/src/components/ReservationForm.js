import { getWorkspaces } from "@/services/workspace.service";

export default function ReservationForm(workspaces = [], reservation = null) {
  const isEditing = !!reservation;

  return `
    <div id="reservationFormOverlay"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-40">

      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <h3 class="text-xl font-bold mb-4">
          ${isEditing ? "Editar Reserva" : "Nueva Reserva"}
        </h3>

        <form id="reservationForm" class="space-y-3">

          <div>
            <label class="block text-sm font-medium mb-1">Espacio</label>
            <select name="workspace" required
              class="border w-full p-2 rounded">
              <option value="">Seleccionar espacio</option>
              ${workspaces
                .filter((w) => w.available)
                .map(
                  (w) => `
                  <option value="${w.name}"
                    ${reservation?.workspace === w.name ? "selected" : ""}>
                    ${w.name}
                  </option>
                `
                )
                .join("")}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Fecha</label>
            <input type="date" name="date" required
              value="${reservation?.date || ""}"
              class="border w-full p-2 rounded">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1">Hora inicio</label>
              <input type="time" name="startHour" required
                value="${reservation?.startHour || ""}"
                class="border w-full p-2 rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Hora fin</label>
              <input type="time" name="endHour" required
                value="${reservation?.endHour || ""}"
                class="border w-full p-2 rounded">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Motivo</label>
            <input type="text" name="reason" required
              value="${reservation?.reason || ""}"
              placeholder="Motivo de la reserva"
              class="border w-full p-2 rounded">
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              ${isEditing ? "Guardar" : "Crear"}
            </button>
            <button type="button" id="cancelFormBtn"
              class="flex-1 bg-slate-200 text-slate-700 py-2 rounded hover:bg-slate-300 transition cursor-pointer">
              Cancelar
            </button>
          </div>

        </form>

      </div>

    </div>
  `;
}
