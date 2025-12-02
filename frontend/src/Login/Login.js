export function OpenLogin() {
  const width = 483;
  const height = 700;
  const left = (window.screen.width / 2) - (width / 2);
  const top  = (window.screen.height / 2) - (height / 2);

  const features = `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=yes`;
  
  window.open(window.location.origin + '/login','_blank',features);
}