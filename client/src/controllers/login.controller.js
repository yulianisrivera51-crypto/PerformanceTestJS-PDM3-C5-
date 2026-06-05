import { saveSession } from "@/utils";
import { navigateTo } from "@/router/router";
import { http } from "@/api/http";

export const loginController = () => {
  const form = document.querySelector("#loginForm");
  const errorMsg = document.querySelector("#loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.classList.add("hidden");

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      errorMsg.textContent = "Completa todos los campos";
      errorMsg.classList.remove("hidden");
      return;
    }

    try {
      const users = await http.get(
        `/users?email=${email}&password=${password}`
      );

      if (!users.length) {
        errorMsg.textContent = "Credenciales incorrectas";
        errorMsg.classList.remove("hidden");
        return;
      }

      saveSession({
        id: users[0].id,
        name: users[0].name,
        role: users[0].role,
      });

      navigateTo("/home");
    } catch (error) {
      console.error(error);
      errorMsg.textContent = "Error al conectar con el servidor";
      errorMsg.classList.remove("hidden");
    }
  });
};
