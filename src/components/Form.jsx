import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/form.css";

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

            const apiUrl = `${process.env.REACT_APP_DOMAIN_NAME}/api/table/tableData`;
            const response = await axios.post(apiUrl, responseData);
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
        // <div>
        //     <h2>Code Submission Form</h2>

        //     <form onSubmit={handleSubmit}>
        //         <div>    
        //             <label htmlFor="username">User Name:</label>
        //             <input id="username" name="username" placeholder="Enter User Name..." value={formData.username} onChange={handleChange} required />
        //         </div>
                
        //         <div>
        //             <label htmlFor="language">Preferred Code Language:</label>
        //             <select id="language" name="language" value={formData.language} onChange={handleChange} required>
        //                 <option value="">Select Language</option>
        //                 <option value="C++">C++</option>
        //                 <option value="Java">Java</option>
        //                 <option value="JavaScript">JavaScript</option>
        //                 <option value="Python">Python</option>
        //             </select>
        //         </div>

        //         <div>
        //             <label htmlFor="stdin">Standard Input (stdin):</label>
        //             <textarea id="stdin" name="stdin" value={formData.stdin} onChange={handleChange} placeholder="Enter standard input here..." required></textarea>
        //         </div>

        //         <div>
        //             <label htmlFor="sourcecode">Source Code:</label>
        //             <textarea id="sourcecode" name="sourcecode" value={formData.sourcecode} onChange={handleChange} placeholder="Enter your source code here..." required></textarea>
        //         </div>
        //         <button>Submit</button>
        //     </form>
        // </div>
        <div class="form-container">
    <h2 class="form-title">Code Submission Form</h2>

    <form onSubmit={handleSubmit} class="form" method="POST">
      <div class="form-group">
                    <label htmlFor="username" class="form-label">User Name:</label>
                    <input type="text" id="username" name="username" class="form-input" placeholder="Enter User Name..." value={formData.username} onChange={handleChange} required />
                </div>
                
                <div class="form-group">
                    <label htmlFor="language" class="form-label">Preferred Code Language:</label>
                    <select id="language" name="language" class="form-select" value={formData.language} onChange={handleChange} required>
                        <option value="">Select Language</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div class="form-group">
                    <label htmlFor="stdin" class="form-label">Standard Input (stdin):</label>
                    <textarea id="stdin" name="stdin" class="form-textarea" value={formData.stdin} onChange={handleChange} placeholder="Enter standard input here..." required></textarea>
                </div>

                <div class="form-group">
                    <label htmlFor="sourcecode" class="form-label">Source Code:</label>
                    <textarea id="sourcecode" name="sourcecode" class="form-textarea" value={formData.sourcecode} onChange={handleChange} placeholder="Enter your source code here..." required></textarea>
                </div>
                <button type="submit" class="form-button">Submit</button>
            </form>
        </div>
    );
}