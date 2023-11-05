import { Link } from 'react-router-dom';
import img from '../assets/not-found.svg';

const Error = () => {
  return (
    <section className="flex justify-center items-center min-h-[60vh] bg-[#f9f9f9]">
      <div className="text-center shadow-md p-5 rounded-lg bg-white">
        <img src={img} alt="not found" className="w-[150px] h-auto mb-5" />
        <h3 className="text-[#2c3e50] font-bold mb-2.5">Ohh!</h3>
        <p className="text-[#7f8c8d] mb-5">
          We can't seem to find page you are looking for
        </p>
        <Link to="/">back home</Link>
      </div>
    </section>
  );
};

export default Error;
