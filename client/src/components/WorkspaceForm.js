export default function WorkspaceForm(workspace = null) {
  const isEditing = !!workspace;

  return `
    <div id="workspaceFormOverlay"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-40">

      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <h3 class="text-xl font-bold mb-4">
          ${isEditing ? "Editar Espacio" : "Nuevo Espacio"}
        </h3>

        <form id="workspaceForm" class="space-y-3">

          <div>
            <label class="block text-sm font-medium mb-1">Nombre</label>
            <input type="text" name="name" required
              value="${workspace?.name || ""}"
              placeholder="Nombre del espacio"
              class="border w-full p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Tipo</label>
            <select name="type" required class="border w-full p-2 rounded">
              <option value="">Seleccionar tipo</option>
              <option value="meeting_room" ${workspace?.type === "meeting_room" ? "selected" : ""}>
                Sala de reuniones
              </option>
              <option value="private_office" ${workspace?.type === "private_office" ? "selected" : ""}>
                Oficina privada
              </option>
              <option value="coworking" ${workspace?.type === "coworking" ? "selected" : ""}>
                Coworking
              </option>
              <option value="auditorium" ${workspace?.type === "auditorium" ? "selected" : ""}>
                Auditorio
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Capacidad</label>
            <input type="number" name="capacity" required min="1"
              value="${workspace?.capacity || ""}"
              placeholder="Número de personas"
              class="border w-full p-2 rounded">
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" name="available" id="availableCheck"
              ${workspace?.available !== false ? "checked" : ""}>
            <label for="availableCheck" class="text-sm">Disponible</label>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              ${isEditing ? "Guardar" : "Crear"}
            </button>
            <button type="button" id="cancelWsFormBtn"
              class="flex-1 bg-slate-200 text-slate-700 py-2 rounded hover:bg-slate-300 transition cursor-pointer">
              Cancelar
            </button>
          </div>

        </form>

      </div>

    </div>
  `;
}
