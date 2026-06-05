import Sidebar from "@/components/Sidebar";
import { workspacesController } from "@/controllers/workspaces.controller";

export default function workspacesView() {
  setTimeout(() => {
    workspacesController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Espacios de Trabajo</h1>
            <p class="text-slate-500 text-sm">Gestión de espacios disponibles</p>
          </div>
          <button
            id="newWorkspaceBtn"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            + Nuevo Espacio
          </button>
        </div>

        <div
          id="workspacesContainer"
          class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div class="w-full text-center py-8 col-span-3">
            <p class="text-slate-400">Cargando espacios...</p>
          </div>
        </div>

        <div id="wsFormContainer"></div>

      </main>

    </div>
  `;
}
