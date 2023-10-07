import './table.css';
import { GetNames, UploadFile, DeleteElement, DownloadElement } from '../services/service';
import React, { useEffect, useState } from 'react';

const ElementosDelBucket = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await GetNames();
            const data = response;
            setData(data);
        } catch (error) {
            console.error("Error fetching nodes:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Llamar a fetchData en la carga inicial
    }, []);

    const handleFileInputClick = () => {
        // Simula un clic en el input de tipo "file" cuando se hace clic en el botón "Subir Archivo"
        document.getElementById("fileInput").click();
    };

    const handleDownloadClick = (nombre) => {
        try {
            DownloadElement(nombre); // Llama a la función DownloadElement
        } catch (error) {
            console.error(`Error al descargar el elemento '${nombre}':`, error);
        }
    };

    const handleFileInputChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                await UploadFile(selectedFile);
                fetchData();
            } catch (error) {
                console.error('Error al cargar el archivo:', error);
            }
        }
    };


    const handleDeleteClick = async (nombre) => {
        try {
            await DeleteElement(nombre); // Llama a la función DeleteElement
            // Actualiza la tabla volviendo a cargar los datos
            fetchData();
        } catch (error) {
            console.error(`Error al eliminar el elemento '${nombre}':`, error);
        }
    };

    return (
        <div className="elementos-bucket">
            <h2>Elementos del Bucket</h2>
            <table>
                <thead>
                    <tr>
                        <th>Índice</th>
                        <th>Nombre del Archivo</th>
                        <th>Descargar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item}</td>
                            <td>
                                <span style={{ color: 'green', fontSize: '28px'}} className="icon descargar" onClick={() => handleDownloadClick(item)}>▼</span>
                            </td>
                            <td>
                            <span style={{ color: 'red', fontSize: '28px'}} className="icon eliminar" onClick={() => handleDeleteClick(item)}>✖</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="upload-button">
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
                <button onClick={handleFileInputClick}>Subir Archivo</button>
            </div>
        </div>
    );
};

export default ElementosDelBucket;
