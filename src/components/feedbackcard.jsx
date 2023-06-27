import { quotes } from "../assets";
import { Link } from "react-router-dom";
const FeedbackCard = ({ content, name, title, img }) => (
  <div className="flex justify-between flex-col px-0 py-0 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src="https://starsunfolded.com/wp-content/uploads/2023/06/Puneet-Superstar-image.jpg" alt="double_quotes" className="w-[100%] h-[30vh] rounded-[20px] object-contain bg-white" />
    <h3 className="font-Roboto not-italic hover:italic font-bold text-[25px] leading-[25.4px] text-white mt-3 mb-1 ">title </h3>
    <p className="font-poppins font-normal text-[15px] leading-[20.4px] text-white mt-1 mb-2">
      {content}
    </p>
    <div class="flex items-center justify-center hover:bg-none">
    <Link to="/Productpage" className="bg-none"> <button className="w-[100%] bg-blue-500 text-white hover:bg-blue-800 hover:text-dimWhite font-bold py-2 px-4 rounded-full">
  Buy
</button></Link>
    </div>
  
  </div>
);


export default FeedbackCard;