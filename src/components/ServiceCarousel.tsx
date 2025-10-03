  import ServiceComponent from "./ServiceComponent";
import { services } from "../Context/services.tsx";
import MainHeading from "./MainHeading.tsx";

function ServiceCarousel() {
  return (
    <div>
      <MainHeading heading="what we build for you" description="We create innovative solutions tailored to your needs." />
      <ServiceComponent items={services} duration={15000} />
    </div>
  );
}

export default ServiceCarousel;
