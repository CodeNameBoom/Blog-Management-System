import { useState } from "react";

import'./Contact.css';



const Contact = ()=>{

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        message:'',
    })

    const [status, setStatus] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try{
            const response = await fetch('http://localhost:8000/api/contact',{

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),


            })
            if(response.ok){
                setStatus('Message sent successfully!');
                setFormData({name: '', email: '', message: ''});
            }else{
                setStatus('Failed to send message');
            }

        }catch(error){
            setStatus('Error while  sending message '+ error.message)

        }
    }

    return(

            <section id="contact">
                <div className="contact-banner">
                <h2>Let's Connect</h2>
                </div>
                <div className="form-container">
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name"> Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="May i know your name ! "
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Your Email."
                        value={formData.email} 
                        onChange={handleChange} 
                        required />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        placeholder="What's in your mind.."
                        value={formData.message} 
                        onChange={handleChange} 
                        required
                        className="message-textarea"
                        

                    ></textarea>
                    
                </div>
                <div className="button-container">
                    <button type="submit" className="button">Send</button>
                </div>
            </form>
            
            {status && <p>{status}</p>}
            </div>
        </section>
    )
}

export default Contact;