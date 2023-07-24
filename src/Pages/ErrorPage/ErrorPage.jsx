import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleGoBack = () =>{
        navigate("/")
    }
return (
    <div className="flex  relative justify-center h-screen">
      <img className="w-full h-full" src="https://uploads-ssl.webflow.com/5fb39592cb1bfc03c9f9b6d2/621df040156fa75470da4837_COBE_article_seo_title.jpg"/>
      <button onClick = {handleGoBack} className="absolute bottom-[160px] font-Montserrat text-lg  left-[570px] w-[400px] px-16 pt-6 pb-12 btn d-btn">
        Go back to home
      </button>
    </div>
  );
};

export default ErrorPage;