(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{localStorage.setItem(`user`,JSON.stringify(e))},t=()=>JSON.parse(localStorage.getItem(`user`)),n=()=>{localStorage.removeItem(`user`)},r=()=>!!t(),i=()=>t()?.role===`admin`,a=e=>({meeting_room:`Sala de reuniones`,private_office:`Oficina privada`,coworking:`Coworking`,auditorium:`Auditorio`})[e]||e,o=e=>({pending:`Pendiente`,approved:`Aprobada`,rejected:`Rechazada`})[e]||e,s=e=>({pending:`bg-yellow-100 text-yellow-800`,approved:`bg-green-100 text-green-800`,rejected:`bg-red-100 text-red-800`})[e]||`bg-gray-100 text-gray-800`,c=`http://localhost:3001`,l=async(e,t={})=>{try{let n=await fetch(`${c}${e}`,{headers:{"Content-Type":`application/json`},...t});if(!n.ok)throw Error(`HTTP Error ${n.status}`);return await n.json()}catch(e){throw console.error(e),e}},u={get:e=>l(e),post:(e,t)=>l(e,{method:`POST`,body:JSON.stringify(t)}),put:(e,t)=>l(e,{method:`PUT`,body:JSON.stringify(t)}),patch:(e,t)=>l(e,{method:`PATCH`,body:JSON.stringify(t)}),delete:e=>l(e,{method:`DELETE`})},d=()=>{let t=document.querySelector(`#loginForm`),n=document.querySelector(`#loginError`);t.addEventListener(`submit`,async r=>{r.preventDefault(),n.classList.add(`hidden`);let i=t.email.value.trim(),a=t.password.value.trim();if(!i||!a){n.textContent=`Completa todos los campos`,n.classList.remove(`hidden`);return}try{let t=await u.get(`/users?email=${i}&password=${a}`);if(!t.length){n.textContent=`Credenciales incorrectas`,n.classList.remove(`hidden`);return}e({id:t[0].id,name:t[0].name,role:t[0].role}),R(`/home`)}catch(e){console.error(e),n.textContent=`Error al conectar con el servidor`,n.classList.remove(`hidden`)}})};function f(){return setTimeout(()=>{d()}),`
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
  `}function p(){let e=t();return setTimeout(()=>{document.querySelectorAll(`[data-link]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),R(e.getAttribute(`href`))})}),document.querySelector(`#logoutBtn`)?.addEventListener(`click`,()=>{n(),R(`/`)})}),`
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

        ${i()?`
              <a href="/workspaces"
                class="px-3 py-2 rounded-lg hover:bg-slate-700 transition"
                data-link>
                Espacios
              </a>
            `:``}
      </nav>

      <div class="border-t border-slate-700 pt-4 mt-4">
        <p class="text-sm text-slate-400 mb-3">
          ${e?.name} (${e?.role})
        </p>

        <button
          id="logoutBtn"
          class="w-full text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-500 px-3 py-2 rounded-lg transition">
          Cerrar sesión
        </button>
      </div>

    </aside>
  `}function m(e,t=!1){let{id:n,workspace:r,date:i,startHour:a,endHour:c,reason:l,status:u}=e;return`
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">

      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg">${r}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${s(u)}">
          ${o(u)}
        </span>
      </div>

      <div class="text-sm text-slate-600 space-y-1">
        <p>📅 ${i}</p>
        <p>🕐 ${a} - ${c}</p>
        <p>📝 ${l}</p>
      </div>

      <div class="flex gap-2 mt-4">
        ${u===`pending`?`
              <button
                class="edit-reservation-btn text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
                data-id="${n}">
                Editar
              </button>
              <button
                class="delete-reservation-btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                data-id="${n}">
                ${t?`Eliminar`:`Cancelar`}
              </button>
            `:``}
        ${t&&u===`pending`?`
              <button
                class="approve-btn text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition cursor-pointer"
                data-id="${n}">
                Aprobar
              </button>
              <button
                class="reject-btn text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition cursor-pointer"
                data-id="${n}">
                Rechazar
              </button>
            `:``}
      </div>

    </article>
  `}var h=()=>u.get(`/reservations`),g=e=>u.post(`/reservations`,e),_=(e,t)=>u.put(`/reservations/${e}`,t),v=(e,t)=>u.patch(`/reservations/${e}`,t),y=e=>u.delete(`/reservations/${e}`),b=async()=>{let e=document.querySelector(`#reservationsContainer`),n=t(),r=i();try{let t=await h(),i=r?t:t.filter(e=>e.userId===n.id);if(!i.length){e.innerHTML=`
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay reservas registradas</p>
        </div>
      `;return}e.innerHTML=i.map(e=>m(e,r)).join(``)}catch(t){console.error(t),e.innerHTML=`
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-500">Error al cargar las reservas</p>
      </div>
    `}};function x(){let e=t();return setTimeout(()=>{b()}),`
    <div class="flex">

      ${p()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="mb-6">
          <h1 class="text-2xl font-bold">
            Bienvenido, ${e?.name}
          </h1>
          <p class="text-slate-500 text-sm">
            Rol: ${e?.role===`admin`?`Administrador`:`Usuario`}
          </p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow-sm">

          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">
              Reservas
            </h2>
            <span class="text-sm text-slate-500">
              ${i()?`Todas las reservas`:`Solo tus reservas`}
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Cargando reservas...</p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `}var S=()=>u.get(`/workspaces`),C=e=>u.post(`/workspaces`,e),w=(e,t)=>u.put(`/workspaces/${e}`,t),T=e=>u.delete(`/workspaces/${e}`);function E(e=[],t=null){let n=!!t;return`
    <div id="reservationFormOverlay"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-40">

      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <h3 class="text-xl font-bold mb-4">
          ${n?`Editar Reserva`:`Nueva Reserva`}
        </h3>

        <form id="reservationForm" class="space-y-3">

          <div>
            <label class="block text-sm font-medium mb-1">Espacio</label>
            <select name="workspace" required
              class="border w-full p-2 rounded">
              <option value="">Seleccionar espacio</option>
              ${e.filter(e=>e.available).map(e=>`
                  <option value="${e.name}"
                    ${t?.workspace===e.name?`selected`:``}>
                    ${e.name}
                  </option>
                `).join(``)}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Fecha</label>
            <input type="date" name="date" required
              value="${t?.date||``}"
              class="border w-full p-2 rounded">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1">Hora inicio</label>
              <input type="time" name="startHour" required
                value="${t?.startHour||``}"
                class="border w-full p-2 rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Hora fin</label>
              <input type="time" name="endHour" required
                value="${t?.endHour||``}"
                class="border w-full p-2 rounded">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Motivo</label>
            <input type="text" name="reason" required
              value="${t?.reason||``}"
              placeholder="Motivo de la reserva"
              class="border w-full p-2 rounded">
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              ${n?`Guardar`:`Crear`}
            </button>
            <button type="button" id="cancelFormBtn"
              class="flex-1 bg-slate-200 text-slate-700 py-2 rounded hover:bg-slate-300 transition cursor-pointer">
              Cancelar
            </button>
          </div>

        </form>

      </div>

    </div>
  `}var D=[],O=[],k=async()=>{let e=document.querySelector(`#reservationsContainer`),n=document.querySelector(`#formContainer`),r=t(),a=i();try{let[e,t]=await Promise.all([h(),S()]);D=a?e:e.filter(e=>e.userId===r.id),O=t,o()}catch(t){console.error(t),e.innerHTML=`
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-500">Error al cargar las reservas</p>
      </div>
    `}document.querySelector(`#newReservationBtn`)?.addEventListener(`click`,()=>{c(null)});function o(){if(!D.length){e.innerHTML=`
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No se encontraron reservas</p>
        </div>
      `;return}e.innerHTML=D.map(e=>m(e,a)).join(``),s()}function s(){document.querySelectorAll(`.edit-reservation-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=D.find(e=>e.id===t);n&&c(n)})}),document.querySelectorAll(`.delete-reservation-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);if(confirm(`¿Estás seguro?`))try{await y(t),D=D.filter(e=>e.id!==t),o(),alert(`Reserva eliminada`)}catch(e){console.error(e),alert(`Error al eliminar`)}})}),document.querySelectorAll(`.approve-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);try{await v(t,{status:`approved`});let e=D.findIndex(e=>e.id===t);e!==-1&&(D[e].status=`approved`),o(),alert(`Reserva aprobada`)}catch(e){console.error(e),alert(`Error al aprobar`)}})}),document.querySelectorAll(`.reject-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);try{await v(t,{status:`rejected`});let e=D.findIndex(e=>e.id===t);e!==-1&&(D[e].status=`rejected`),o(),alert(`Reserva rechazada`)}catch(e){console.error(e),alert(`Error al rechazar`)}})})}function c(e){n.innerHTML=E(O,e);let t=document.querySelector(`#reservationForm`),i=document.querySelector(`#reservationFormOverlay`);document.querySelector(`#cancelFormBtn`)?.addEventListener(`click`,()=>{n.innerHTML=``}),i?.addEventListener(`click`,e=>{e.target===i&&(n.innerHTML=``)}),t?.addEventListener(`submit`,async i=>{i.preventDefault();let a={userId:r.id,workspace:t.workspace.value,date:t.date.value,startHour:t.startHour.value,endHour:t.endHour.value,reason:t.reason.value,status:e?e.status:`pending`};if(a.startHour>=a.endHour){alert(`La hora de fin debe ser mayor a la de inicio`);return}try{if(e){let t=await _(e.id,a),n=D.findIndex(t=>t.id===e.id);n!==-1&&(D[n]=t),alert(`Reserva actualizada`)}else{let e=await g(a);D.push(e),alert(`Reserva creada`)}n.innerHTML=``,o()}catch(e){console.error(e),alert(`Error al guardar`)}})}};function A(){t();let e=i();return setTimeout(()=>{k()}),`
    <div class="flex">

      ${p()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Reservas</h1>
            <p class="text-slate-500 text-sm">
              ${e?`Gestión de todas las reservas`:`Tus reservas`}
            </p>
          </div>
          <button
            id="newReservationBtn"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            + Nueva Reserva
          </button>
        </div>

        <div
          id="reservationsContainer"
          class="grid gap-4 md:grid-cols-2"
        >
          <div class="w-full text-center py-8 col-span-2">
            <p class="text-slate-400">Cargando reservas...</p>
          </div>
        </div>

        <div id="formContainer"></div>

      </main>

    </div>
  `}function j(e){let{id:t,name:n,type:r,capacity:i,available:o}=e;return`
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">

      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg">${n}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${o?`bg-green-100 text-green-800`:`bg-red-100 text-red-800`}">
          ${o?`Disponible`:`No disponible`}
        </span>
      </div>

      <div class="text-sm text-slate-600 space-y-1">
        <p>📋 ${a(r)}</p>
        <p>👥 Capacidad: ${i} personas</p>
      </div>

      <div class="flex gap-2 mt-4">
        <button
          class="edit-workspace-btn text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
          data-id="${t}">
          Editar
        </button>
        <button
          class="delete-workspace-btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
          data-id="${t}">
          Eliminar
        </button>
      </div>

    </article>
  `}function M(e=null){let t=!!e;return`
    <div id="workspaceFormOverlay"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-40">

      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        <h3 class="text-xl font-bold mb-4">
          ${t?`Editar Espacio`:`Nuevo Espacio`}
        </h3>

        <form id="workspaceForm" class="space-y-3">

          <div>
            <label class="block text-sm font-medium mb-1">Nombre</label>
            <input type="text" name="name" required
              value="${e?.name||``}"
              placeholder="Nombre del espacio"
              class="border w-full p-2 rounded">
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Tipo</label>
            <select name="type" required class="border w-full p-2 rounded">
              <option value="">Seleccionar tipo</option>
              <option value="meeting_room" ${e?.type===`meeting_room`?`selected`:``}>
                Sala de reuniones
              </option>
              <option value="private_office" ${e?.type===`private_office`?`selected`:``}>
                Oficina privada
              </option>
              <option value="coworking" ${e?.type===`coworking`?`selected`:``}>
                Coworking
              </option>
              <option value="auditorium" ${e?.type===`auditorium`?`selected`:``}>
                Auditorio
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Capacidad</label>
            <input type="number" name="capacity" required min="1"
              value="${e?.capacity||``}"
              placeholder="Número de personas"
              class="border w-full p-2 rounded">
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" name="available" id="availableCheck"
              ${e?.available===!1?``:`checked`}>
            <label for="availableCheck" class="text-sm">Disponible</label>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              ${t?`Guardar`:`Crear`}
            </button>
            <button type="button" id="cancelWsFormBtn"
              class="flex-1 bg-slate-200 text-slate-700 py-2 rounded hover:bg-slate-300 transition cursor-pointer">
              Cancelar
            </button>
          </div>

        </form>

      </div>

    </div>
  `}var N=[],P=async()=>{let e=document.querySelector(`#workspacesContainer`),t=document.querySelector(`#wsFormContainer`);try{N=await S(),n()}catch(t){console.error(t),e.innerHTML=`
      <div class="w-full text-center py-8 col-span-3">
        <p class="text-red-500">Error al cargar los espacios</p>
      </div>
    `}document.querySelector(`#newWorkspaceBtn`)?.addEventListener(`click`,()=>{i(null)});function n(){if(!N.length){e.innerHTML=`
        <div class="w-full text-center py-8 col-span-3">
          <p class="text-slate-500">No hay espacios registrados</p>
        </div>
      `;return}e.innerHTML=N.map(e=>j(e)).join(``),r()}function r(){document.querySelectorAll(`.edit-workspace-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=N.find(e=>e.id===t);n&&i(n)})}),document.querySelectorAll(`.delete-workspace-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);if(confirm(`¿Eliminar este espacio?`))try{await T(t),N=N.filter(e=>e.id!==t),n(),alert(`Espacio eliminado`)}catch(e){console.error(e),alert(`Error al eliminar`)}})})}function i(e){t.innerHTML=M(e);let r=document.querySelector(`#workspaceForm`),i=document.querySelector(`#workspaceFormOverlay`);document.querySelector(`#cancelWsFormBtn`)?.addEventListener(`click`,()=>{t.innerHTML=``}),i?.addEventListener(`click`,e=>{e.target===i&&(t.innerHTML=``)}),r?.addEventListener(`submit`,async i=>{i.preventDefault();let a={name:r.name.value.trim(),type:r.type.value,capacity:Number(r.capacity.value),available:r.available.checked};if(!a.name||!a.type||!a.capacity){alert(`Completa todos los campos`);return}try{if(e){let t=await w(e.id,a),n=N.findIndex(t=>t.id===e.id);n!==-1&&(N[n]=t),alert(`Espacio actualizado`)}else{let e=await C(a);N.push(e),alert(`Espacio creado`)}t.innerHTML=``,n()}catch(e){console.error(e),alert(`Error al guardar`)}})}};function F(){return setTimeout(()=>{P()}),`
    <div class="flex">

      ${p()}

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
  `}function I(){return`
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">

      <h1 class="text-8xl font-bold text-slate-800">
        404
      </h1>

      <h2 class="text-2xl font-semibold text-slate-700 mt-4">
        Página no encontrada
      </h2>

      <p class="text-slate-500 mt-2 text-center max-w-md">
        La ruta que intentas visitar no existe o fue movida.
      </p>

      <button
        id="goHome"
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition cursor-pointer"
      >
        Volver al inicio
      </button>

    </div>
  `}var L={"/":{view:f,auth:!1},"/home":{view:x,auth:!0},"/reservations":{view:A,auth:!0},"/workspaces":{view:F,auth:!0,adminOnly:!0}},R=e=>{history.pushState({},``,e),z()},z=()=>{let e=document.querySelector(`#app`),t=window.location.pathname,n=L[t];if(!n){e.innerHTML=I(),B();return}if(n.auth&&!r()){history.replaceState({},``,`/`),e.innerHTML=L[`/`].view();return}if(t===`/`&&r()){history.replaceState({},``,`/home`),e.innerHTML=L[`/home`].view();return}if(n.adminOnly&&!i()){history.replaceState({},``,`/home`),e.innerHTML=L[`/home`].view();return}e.innerHTML=n.view()},B=()=>{setTimeout(()=>{document.querySelector(`#goHome`)?.addEventListener(`click`,()=>{R(r()?`/home`:`/`)})})};window.addEventListener(`popstate`,z),document.addEventListener(`DOMContentLoaded`,()=>{z()});