//@ts-check

/**
 * @param {any} id
 * @param {any} file
 */
export async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();

  const element = document.getElementById(id);
  if(!element) throw new Error(`Element with id ${id} not found`);
  element.innerHTML = html;
}