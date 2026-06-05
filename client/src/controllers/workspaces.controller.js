import WorkspaceCard from "@components/WorkspaceCard";
import WorkspaceForm from "@components/WorkspaceForm";
import {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "@services/workspace.service";

let allWorkspaces = [];

export const workspacesController = async () => {
  const container = document.querySelector("#workspacesContainer");
  const formContainer = document.querySelector("#wsFormContainer");

  try {
    allWorkspaces = await getWorkspaces();
    renderWorkspaces();
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="w-full text-center py-8 col-span-3">
        <p class="text-red-500">Error al cargar los espacios</p>
      </div>
    `;
  }

  document.querySelector("#newWorkspaceBtn")?.addEventListener("click", () => {
    openForm(null);
  });

  function renderWorkspaces() {
    if (!allWorkspaces.length) {
      container.innerHTML = `
        <div class="w-full text-center py-8 col-span-3">
          <p class="text-slate-500">No hay espacios registrados</p>
        </div>
      `;
      return;
    }

    container.innerHTML = allWorkspaces
      .map((w) => WorkspaceCard(w))
      .join("");

    setupCardEvents();
  }

  function setupCardEvents() {
    document.querySelectorAll(".edit-workspace-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const workspace = allWorkspaces.find((w) => String(w.id) === id);
        if (workspace) openForm(workspace);
      });
    });

    document.querySelectorAll(".delete-workspace-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (!confirm("¿Eliminar este espacio?")) return;

        try {
          await deleteWorkspace(id);
          allWorkspaces = allWorkspaces.filter((w) => String(w.id) !== id);
          renderWorkspaces();
          alert("Espacio eliminado");
        } catch (error) {
          console.error(error);
          alert("Error al eliminar");
        }
      });
    });
  }

  function openForm(workspace) {
    formContainer.innerHTML = WorkspaceForm(workspace);

    const form = document.querySelector("#workspaceForm");
    const overlay = document.querySelector("#workspaceFormOverlay");

    document.querySelector("#cancelWsFormBtn")?.addEventListener("click", () => {
      formContainer.innerHTML = "";
    });

    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) formContainer.innerHTML = "";
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value.trim(),
        type: form.type.value,
        capacity: Number(form.capacity.value),
        available: form.available.checked,
      };

      if (!data.name || !data.type || !data.capacity) {
        alert("Completa todos los campos");
        return;
      }

      try {
        if (workspace) {
          const updated = await updateWorkspace(workspace.id, data);
          const idx = allWorkspaces.findIndex((w) => w.id === workspace.id);
          if (idx !== -1) allWorkspaces[idx] = updated;
          alert("Espacio actualizado");
        } else {
          const created = await createWorkspace(data);
          allWorkspaces.push(created);
          alert("Espacio creado");
        }

        formContainer.innerHTML = "";
        renderWorkspaces();
      } catch (error) {
        console.error(error);
        alert("Error al guardar");
      }
    });
  }
};
