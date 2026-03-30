  // 1. Configurar  lo que queremos ver
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  // 2. Buscat elemento por su ID 
  const time = document.getElementById('time-wid');

  const uptimeDate = () => {
    // Usamos 'undefined' para que detecte el idioma del navegador automáticamente
    time.innerText = new Intl.DateTimeFormat(undefined, options).format(new Date());
  };

  // 3. Ejecutar de inmediato y luego cada segundo
  uptimeDate();
  setInterval(uptimeDate, 1000);