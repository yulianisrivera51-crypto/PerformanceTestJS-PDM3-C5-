import ReservationCard from "@components/ReservationCard";
import ReservationForm from "@components/ReservationForm";
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  patchReservation,
} from "@services/reservation.service";
import { getWorkspaces } from "@services/workspace.service";
import { getSession, isAdmin } from "@/utils";

let allReservations = [];
let workspacesList = [];

export const reservationsController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const formContainer = document.querySelector("#formContainer");
  const user = getSession();
  const admin = isAdmin();

  // cargar datos iniciales
  try {
    const [reservations, workspaces] = await Promise.all([
      getReservations(),
      getWorkspaces(),
    ]);

    allReservations = admin
      ? reservations
      : reservations.filter((r) => r.userId === user.id);
    workspacesList = workspaces;

    renderReservations();
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-500">Error al cargar las reservas</p>
      </div>
    `;
  }

  // boton nueva reserva
  document.querySelector("#newReservationBtn")?.addEventListener("click", () => {
    openForm(null);
  });

  function renderReservations() {
    if (!allReservations.length) {
      container.innerHTML = `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No se encontraron reservas</p>
        </div>
      `;
      return;
    }

    container.innerHTML = allReservations
      .map((r) => ReservationCard(r, admin))
      .join("");

    setupCardEvents();
  }

  function setupCardEvents() {
    // editar
    document.querySelectorAll(".edit-reservation-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const reservation = allReservations.find((r) => String(r.id) === id);
        if (reservation) openForm(reservation);
      });
    });

    // eliminar / cancelar
    document.querySelectorAll(".delete-reservation-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (!confirm("¿Estás seguro?")) return;

        try {
          await deleteReservation(id);
          allReservations = allReservations.filter((r) => String(r.id) !== id);
          renderReservations();
          alert("Reserva eliminada");
        } catch (error) {
          console.error(error);
          alert("Error al eliminar");
        }
      });
    });

    // aprobar (solo admin)
    document.querySelectorAll(".approve-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          await patchReservation(id, { status: "approved" });
          const idx = allReservations.findIndex((r) => String(r.id) === id);
          if (idx !== -1) allReservations[idx].status = "approved";
          renderReservations();
          alert("Reserva aprobada");
        } catch (error) {
          console.error(error);
          alert("Error al aprobar");
        }
      });
    });

    // rechazar (solo admin)
    document.querySelectorAll(".reject-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          await patchReservation(id, { status: "rejected" });
          const idx = allReservations.findIndex((r) => String(r.id) === id);
          if (idx !== -1) allReservations[idx].status = "rejected";
          renderReservations();
          alert("Reserva rechazada");
        } catch (error) {
          console.error(error);
          alert("Error al rechazar");
        }
      });
    });
  }

  function openForm(reservation) {
    formContainer.innerHTML = ReservationForm(workspacesList, reservation);

    const form = document.querySelector("#reservationForm");
    const overlay = document.querySelector("#reservationFormOverlay");

    document.querySelector("#cancelFormBtn")?.addEventListener("click", () => {
      formContainer.innerHTML = "";
    });

    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) formContainer.innerHTML = "";
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        userId: user.id,
        workspace: form.workspace.value,
        date: form.date.value,
        startHour: form.startHour.value,
        endHour: form.endHour.value,
        reason: form.reason.value,
        status: reservation ? reservation.status : "pending",
      };

      if (data.startHour >= data.endHour) {
        alert("La hora de fin debe ser mayor a la de inicio");
        return;
      }

      try {
        if (reservation) {
          const updated = await updateReservation(reservation.id, data);
          const idx = allReservations.findIndex((r) => r.id === reservation.id);
          if (idx !== -1) allReservations[idx] = updated;
          alert("Reserva actualizada");
        } else {
          const created = await createReservation(data);
          allReservations.push(created);
          alert("Reserva creada");
        }

        formContainer.innerHTML = "";
        renderReservations();
      } catch (error) {
        console.error(error);
        alert("Error al guardar");
      }
    });
  }
};
