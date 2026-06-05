import { removeSession, getSession, isAdmin } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  const user = getSession();

  setTimeout(() => {
    // navegacion con data-link
    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(link.getAttribute("href"));
      });
    });

    // boton de cerrar sesion
    document.querySelector("#logoutBtn")?.addEventListener("click", () => {
      removeSession();
      navigateTo("/");
    });
  });

  return `
    <aside class="w-64 bg-slate-900 text-white min-h-screen p-5 flex flex-col">

      <h2 class="text-xl font-bold mb-8">
        Reservas App
      </h2>

      <nav class="flex flex-col gap-2 flex-1">

        <a href="/home"
          class="px-3 py-2 rounded-lg hover:bg-slate-700 transition"
          data-link>
          Inicio
        </a>

        <a href="/reservations"
          class="px-3 py-2 rounded-lg hover:bg-slate-700 transition"
          data-link>
          Reservas
        </a>

        ${
          isAdmin()
            ? `
              <a href="/workspaces"
                class="px-3 py-2 rounded-lg hover:bg-slate-700 transition"
                data-link>
                Espacios
              </a>
            `
            : ""
        }
      </nav>

      <div class="border-t border-slate-700 pt-4 mt-4">
        <p class="text-sm text-slate-400 mb-3">
          ${user?.name} (${user?.role})
        </p>

        <button
          id="logoutBtn"
          class="w-full text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-500 px-3 py-2 rounded-lg transition">
          Cerrar sesión
        </button>
      </div>

    </aside>
  `;
}