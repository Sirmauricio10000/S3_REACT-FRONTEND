import './table.css';
import { GetNames, UploadFile } from '../services/service';
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
                                <span className="icon descargar">▼</span>
                            </td>
                            <td>
                                <span className="icon eliminar">✖</span>
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
