import Offer from "@/components/landing/offer";
import Hero from "@/components/landing/hero";
import Explore from "@/components/landing/explore";
import About from "@/components/landing/about";
import Gallery from "@/components/landing/gallery";
import Layout from "@/components/layout/layout";

export default function Home() {
  return (
    <div className="bg-white ">
      <Layout>
        <Hero />
        <Offer />
        <About />
        <Explore />
        <Gallery />
      </Layout>
    </div>
  );
}
