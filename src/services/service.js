const URL = 'http://127.0.0.1:8080';

export async function GetNames() {
    try {
        const response = await fetch(URL + "/lista_elementos");
        const data = response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
}

export async function UploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(URL + '/subir_elemento', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Archivo cargado con éxito.');
        } else {
            console.error('Error al cargar el archivo.');
        }
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        throw error;
    }
}


export async function DeleteElement(nombre) {
    try {
        const response = await fetch(`${URL}/eliminar_elemento/${nombre}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Elemento '${nombre}' eliminado con éxito.`);
        } else {
            console.error(`Error al eliminar el elemento '${nombre}'.`);
        }
    } catch (error) {
        console.error(`Error al eliminar el elemento '${nombre}':`, error);
        throw error;
    }
}


export function DownloadElement(nombre) {
    try {
        // Construye la URL de descarga con el nombre del elemento
        const downloadUrl = `${URL}/descargar_elemento/${nombre}`;
        // Abre una nueva ventana o pestaña del navegador para descargar el archivo
        window.open(downloadUrl, '_blank');
    } catch (error) {
        console.error(`Error al descargar el elemento '${nombre}':`, error);
        throw error;
    }
}


