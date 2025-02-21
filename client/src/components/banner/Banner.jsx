import axios from "axios";
import  { useState, useEffect,useRef } from "react";
import  './Banner.css';



const Banner = () =>{
    const [quote, setQuote] = useState("Hello :)");
    const [author, setAuthor] = useState("");
    const [fadeOut, setFadeOut] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(false);
    const intervalRef = useRef(null);
    

        const fetchQuote = async () => {
            try{
              
                const response = await axios.get("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random");
                console.log("Fetched quote data:", response.data);

                setFadeOut(true);

                setTimeout(() => {
                  setQuote(response.data[0].q);
                  setAuthor(response.data[0].a);

                setFadeOut(false);
              }, 2500);
            }catch (error) {
              console.error("Error while fetching the quote:", error);
              setQuote("Error while fetching the quote.");
              setAuthor("");
              setFadeOut(false);

            }
        };

        useEffect(() => {
          setBannerVisible(true);

            fetchQuote(); //first quote 


            if (!intervalRef.current) {
            intervalRef.current = setInterval(fetchQuote, 30000);
            }
            return () => {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            };
        },[]);

        return (
            <div className={`banner ${bannerVisible ? "banner-animation" : ""}`}>
              <div className = {`quote ${fadeOut ? "fade-out" : "fade-in"}`}>
                "{quote}" <br />
                <span className="author">- {author}</span>
              </div>
            </div>
          );       
};
export default Banner;