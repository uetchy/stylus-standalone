import fetch from 'cross-fetch';

document.addEventListener('DOMContentLoaded', () => {
  const stylusTags = document.querySelectorAll('link[type="text/stylus"]');
  stylusTags.forEach(async (link) => {
    const source = await fetch(link.href).then((res) => res.text());
    const css = stylus.render(source);
    const element = document.createElement('style');
    element.type = 'text/css';
    element.innerHTML = css;
    link.after(element);
  });
});
