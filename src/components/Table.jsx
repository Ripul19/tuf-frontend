import React, { useState, useEffect } from 'react';
import axios from 'axios'; 


export default function Table() {
    const [ tableData, setTableData ] = useState([]);
    const [ expandedRow, setExpandedRow ] = useState(null);
    
    const apiUrl = `${process.env.REACT_APP_DOMAIN_NAME}/api/table/tableView`;
    

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(apiUrl);
                setTableData(response.data.map((item) => ({
                    ...item,
                    truncatedSourceCode: item.source_code.slice(0, 100),
                })));
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); 
    }, [apiUrl]);

    return (
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Code Language</th>
                        <th>stdin</th>
                        <th>Source Code</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(row => {
                        return (
                            <tr>
                                <td>{row.username}</td>
                                <td>{row.preferred_code_language}</td>
                                <td>{row.stdin}</td>
                                <td>
                                    {expandedRow === row.id ? row.source_code : `${row.source_code.substring(0, 100)}...`}
                                    <span onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                                    style={{cursor:'pointer', color:'blue'}}>
                                        {expandedRow === row.id ? '...less' : '...more'}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    )
}