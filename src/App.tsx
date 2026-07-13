import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";
import { Blog } from "./pages/Blog";
import { BlogAdmin } from "./pages/BlogAdmin";
import { BlogPost } from "./pages/BlogPost";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { HiringPortal } from "./pages/HiringPortal";
import { Industries } from "./pages/Industries";
import { IndustryDetail } from "./pages/IndustryDetail";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Services } from "./pages/Services";
import { Technology } from "./pages/Technology";
import { TechnologyDetail } from "./pages/TechnologyDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryDetail />} />
        <Route path="technology" element={<Technology />} />
        <Route path="technology/:slug" element={<TechnologyDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="blog-admin" element={<BlogAdmin />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
        <Route path="hiring" element={<HiringPortal />} />
        <Route path=":candidateSlug/hiring/:roleSlug" element={<HiringPortal />} />
      </Route>
    </Routes>
  );
}
