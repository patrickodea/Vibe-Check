import { useState } from "react";
import Header from "./Header";
import Browse from "../pages/Browse";
import Saved from "../pages/Saved";
import Playlists from "../pages/Playlists";
import Signup from "../pages/Signup";

export default function Navigation() {
    const [currentPage, setCurrentPage] = useState("Browse");

    const renderPage = () => {
        if (currentPage === 'Browse') {
            return <Browse />
        }
        if (currentPage === 'Playlists') {
            return <Playlists />
        }
        if (currentPage === 'Saved') {
            return <Saved />
        }
        if (currentPage === 'Signup') {
            return <Signup />
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            <main>{renderPage()}</main>
        </div>
    )

}