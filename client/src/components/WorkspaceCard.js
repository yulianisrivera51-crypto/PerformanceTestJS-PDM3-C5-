import { translateType } from "@/utils";

export default function WorkspaceCard(workspace) {
  const { id, name, type, capacity, available } = workspace;

  return `
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">

      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg">${name}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${
          available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }">
          ${available ? "Disponible" : "No disponible"}
        </span>
      </div>

      <div class="text-sm text-slate-600 space-y-1">
        <p>📋 ${translateType(type)}</p>
        <p>👥 Capacidad: ${capacity} personas</p>
      </div>

      <div class="flex gap-2 mt-4">
        <button
          class="edit-workspace-btn text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
          data-id="${id}">
          Editar
        </button>
        <button
          class="delete-workspace-btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
          data-id="${id}">
          Eliminar
        </button>
      </div>

    </article>
  `;
}
