import image1 from "../Images/ImageSlider/image1.jpg";
import image2 from "../Images/ImageSlider/image2.png";
import image3 from "../Images/ImageSlider/image3.png";
import image4 from "../Images/ImageSlider/image4.png";

export interface BlogMetaData {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}


const blogsMetaData: BlogMetaData[] = [
    {
        id: 1,
        date: "August 15, 2024",
        title: "Innovative Aluminum Fabrication Techniques for Modern Architecture",
        image: image1,
        link: "/blogs/innovative-aluminum-fabrication-techniques"
    },
    {
        id: 2,
        date: "September 5, 2024",
        title: "Sustainable Practices in Aluminum Fabrication",
        image: image2,
        link: "/blogs/sustainable-practices-aluminum-fabrication"
    },
    {
        id: 3,
        date: "October 10, 2024",
        title: "The Future of Aluminum Fabrication: Trends to Watch",
        image: image3,
        link: "/blogs/future-of-aluminum-fabrication-trends"
    },
    {
        id: 4,
        date: "November 20, 2024",
        title: "How Innovista Fabriconix is Revolutionizing Aluminum Fabrication",
        image: image4,
        link: "/blogs/innovista-fabriconix-revolutionizing-aluminum-fabrication"
    }
]

export default blogsMetaData;