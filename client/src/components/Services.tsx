import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

type Props = {
  color: string;
  title: string;
  subtitle: string;
  icon: React.ReactElement;
};

const ServiceCard: React.FC<Props> = ({ color, title, subtitle, icon }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl'>
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1'>
      <h3 className='mt-2 text-white text-lg'>{title}</h3>
      <p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className='flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services'>
      <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
        <div className='flex-1 flex flex-col justify-start items-start'>
          <h2 className='text-white text-5xl md:text-4xl py-2'>
            Services that we
            <br />
            continue to improve
          </h2>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-start items-center'>
        <ServiceCard
          color='bg-dark-blue'
          title='Security Guaranteed'
          icon={
            <BsShieldFillCheck
              fontSize={21}
              className='text-white'
            />
          }
          subtitle='Security is guaranteed. We always maintain privacy and maintaing the quality of our products.'
        />
        <ServiceCard
          color='bg-purple'
          title='Best exchange rates'
          icon={
            <BiSearchAlt
              fontSize={21}
              className='text-white'
            />
          }
          subtitle='Security is guaranteed. We always maintain privacy and maintaing the quality of our products.'
        />
        <ServiceCard
          color='bg-papaya'
          title='Fastest transactions'
          icon={
            <RiHeart2Fill
              fontSize={21}
              className='text-white'
            />
          }
          subtitle='Security is guaranteed. We always maintain privacy and maintaing the quality of our products.'
        />
      </div>
    </div>
  );
};

export default Services;
