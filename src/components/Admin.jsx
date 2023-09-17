import React, { useState } from 'react'
import * as XLSX from "xlsx";
import lodash from 'lodash';
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate();
    const [loading, setLodaing] = useState(false);

    function parsedData(file) {
        return new Promise((resolve, reject) => {
            try {
                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = (e) => {
                    const bufferArray = e.target?.result;
                    const workbook = XLSX.read(bufferArray, {
                        type: "buffer"
                    });

                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });

                    const headers = jsonData[0];
                    const data = jsonData.slice(1);

                    const parsedData = data.map((row) => {
                        const rowData = {};
                        headers.forEach((header, index) => {

                            rowData[lodash.snakeCase(header)] = row[index];

                        });
                        return rowData;
                    });

                    resolve(parsedData);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        const formData = new FormData(formElement); // Create FormData from the form element

        const file = formData.get('excel-file');

        if (!file) {
            console.log("No file selected.");
            return;
        }

        try {
            setLodaing(true);
            const parsedDataResult = await parsedData(file);
            // console.log(parsedDataResult);

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/student-data/add-student-data`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ parsedDataResult }),
            });

            navigate('/')
        } catch (error) {
            console.error("Error parsing data:", error);
        } finally {
            setLodaing(false);
        }


    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl h-80 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input type="file" required name="excel-file" accept=".xlsx" className='border rounded-md p-4' />
                {
                    loading ?
                        <button type="submit" className="bg-blue-500 text-white border rounded-md p-2 flex items-center justify-center gap-3 hover:bg-blue-400" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                            Processing...
                        </button>
                        :
                        <button className='border bg-blue-600 text-white rounded-md p-2 cursor-pointer hover:bg-blue-500' >Submit</button>
                }
            </form>
        </main>
    )
}

export default Admin