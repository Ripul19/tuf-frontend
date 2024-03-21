import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [ formData ,setFormData] = useState({
        username: '',
        language: '',
        stdin: '',
        sourcecode: ''
    });

    const navigate = useNavigate();


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => {
            const updatedValues = {
                ...prevData,
                [name] : value
            }
            return updatedValues;
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            let responseData = {
                username: formData.username,
                preferred_code_language: formData.language,
                stdin: formData.stdin,
                source_code: formData.sourcecode
            }
            const response = await axios.post('http://localhost:4000/api/table/tableData', responseData);
            console.log('Response from server:', response);
            setFormData({
                username: '',
                language: '',
                stdin: '',
                sourcecode: ''
          });
          navigate('/table');
        }
        catch(error) {
            console.log('Error submitting form: ',error);
        }
    }
    
    return (
        <div>
            <h2>Code Submission Form</h2>

            <form onSubmit={handleSubmit}>
                <div>    
                    <label htmlFor="username">User Name:</label>
                    <input id="username" name="username" placeholder="Enter User Name..." value={formData.username} onChange={handleChange} required />
                </div>
                
                <div>
                    <label htmlFor="language">Preferred Code Language:</label>
                    <select id="language" name="language" value={formData.language} onChange={handleChange} required>
                        <option value="">Select Language</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="stdin">Standard Input (stdin):</label>
                    <textarea id="stdin" name="stdin" value={formData.stdin} onChange={handleChange} placeholder="Enter standard input here..." required></textarea>
                </div>

                <div>
                    <label htmlFor="sourcecode">Source Code:</label>
                    <textarea id="sourcecode" name="sourcecode" value={formData.sourcecode} onChange={handleChange} placeholder="Enter your source code here..." required></textarea>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}