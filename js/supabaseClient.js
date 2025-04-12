// js/supabaseClient.js
// --- Configuración de Supabase ---
// Intenta obtener las claves desde variables de entorno (MÁS SEGURO)
// o usa placeholders si no están definidas (pero recuerda configurarlas para que funcione)
const SUPABASE_URL = "https://tjglkfxhsdlehiylsfyq.supabase.co"; // Usa VITE_ si usas Vite, process.env si usas Node/Build Tool, o directo como placeholder
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZ2xrZnhoc2RsZWhpeWxzZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTkxNzYsImV4cCI6MjA1OTk5NTE3Nn0.qk5A9OFa_-J3AGYiyD5c4Fha4MKopQV1eJU-y0rH3uI";
let supabase = null;
let initError = null;

if (
  (!SUPABASE_URL &&
    SUPABASE_URL === "https://tjglkfxhsdlehiylsfyq.supabase.co") ||
  (!SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZ2xrZnhoc2RsZWhpeWxzZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MTkxNzYsImV4cCI6MjA1OTk5NTE3Nn0.qk5A9OFa_-J3AGYiyD5c4Fha4MKopQV1eJU-y0rH3uI")
) {
  initError =
    "Error: Configuración de Supabase incompleta. Revisa las variables SUPABASE_URL y SUPABASE_ANON_KEY.";
  console.error(initError);
  // Podrías lanzar un error o manejarlo en main.js
} else {
  try {
    // Asegúrate que la variable global supabase de la librería CDN esté disponible
    if (
      typeof window !== "undefined" &&
      window.supabase &&
      window.supabase.createClient
    ) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("Supabase Client Inicializado desde CDN");
    } else if (typeof supabase !== "undefined" && supabase.createClient) {
      supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("Supabase Client Inicializado");
    } else {
      initError = "Error: La librería Supabase no se cargó correctamente.";
      console.error(initError);
    }
  } catch (error) {
    initError = `Error al inicializar Supabase: ${error.message}`;
    console.error(initError, error);
  }
}

// Exportamos el cliente (o null si hubo error) y el mensaje de error
// Nota: Para usar 'export' directamente necesitarías usar módulos JS (<script type="module">)
//       Si no usas módulos, puedes simplemente asegurarte de que la variable global supabase
//       se cree aquí y main.js se cargue después. Por simplicidad, mantendremos la variable global
//       creada por createClient y main.js la usará directamente.
//       Si decides usar módulos, harías: export { supabase, initError };