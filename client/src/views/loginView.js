import { loginController } from "@/controllers/login.controller";

export default function loginView() {
  setTimeout(() => {
    loginController();
  });

  return `
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-2xl font-bold mb-2">
          Reservas App
        </h1>

        <p class="text-slate-500 text-sm mb-6">
          Inicia sesión para continuar
        </p>

        <form id="loginForm">

          <label class="block text-sm font-medium mb-1">Correo</label>
          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            required
            class="border w-full p-2 rounded mb-3"
          >

          <label class="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            required
            class="border w-full p-2 rounded mb-1"
          >

          <p id="loginError" class="text-red-500 text-sm mb-3 hidden">
            Credenciales incorrectas
          </p>

          <button
            type="submit"
            class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  `;
}