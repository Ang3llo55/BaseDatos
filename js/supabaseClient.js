// js/supabaseClient.js

// --- Configuración de Supabase ---
// Intenta obtener las claves desde variables de entorno (MÁS SEGURO)
// o usa placeholders si no están definidas (pero recuerda configurarlas para que funcione)
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'TU_SUPABASE_URL'; // Usa VITE_ si usas Vite, process.env si usas Node/Build Tool, o directo como placeholder
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY';

let supabase = null;
let initError = null;

if (!SUPABASE_URL || SUPABASE_URL === 'TU_SUPABASE_URL' || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'TU_SUPABASE_ANON_KEY') {
    initError = "Error: Configuración de Supabase incompleta. Revisa las variables SUPABASE_URL y SUPABASE_ANON_KEY.";
    console.error(initError);
    // Podrías lanzar un error o manejarlo en main.js
} else {
    try {
        // Asegúrate que la variable global `supabase` de la librería CDN esté disponible
        if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
             supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
             console.log('Supabase Client Inicializado');
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
//       Si no usas módulos, puedes simplemente asegurarte de que la variable global `supabase`
//       se cree aquí y main.js se cargue después. Por simplicidad, mantendremos la variable global
//       creada por createClient y main.js la usará directamente.
//       Si decides usar módulos, harías: export { supabase, initError };