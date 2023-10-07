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
