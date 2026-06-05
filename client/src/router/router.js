import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import reservationsView from "@/views/reservationsView";
import workspacesView from "@/views/workspacesView";
import NotFoundView from "@/views/notFound";
import { isAuthenticated, isAdmin } from "@/utils";

const routes = {
  "/": { view: loginView, auth: false },
  "/home": { view: homeView, auth: true },
  "/reservations": { view: reservationsView, auth: true },
  "/workspaces": { view: workspacesView, auth: true, adminOnly: true },
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;
  const route = routes[path];

  // si no existe la ruta mostramos 404
  if (!route) {
    app.innerHTML = NotFoundView();
    setupNotFoundEvents();
    return;
  }

  // si requiere auth y no esta logueado, redirigir al login
  if (route.auth && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    app.innerHTML = routes["/"].view();
    return;
  }

  // si ya esta logueado y va al login, mandarlo al home
  if (path === "/" && isAuthenticated()) {
    history.replaceState({}, "", "/home");
    app.innerHTML = routes["/home"].view();
    return;
  }

  // si es ruta solo para admin y el usuario no lo es
  if (route.adminOnly && !isAdmin()) {
    history.replaceState({}, "", "/home");
    app.innerHTML = routes["/home"].view();
    return;
  }

  app.innerHTML = route.view();
};

const setupNotFoundEvents = () => {
  setTimeout(() => {
    document.querySelector("#goHome")?.addEventListener("click", () => {
      navigateTo(isAuthenticated() ? "/home" : "/");
    });
  });
};

window.addEventListener("popstate", router);
