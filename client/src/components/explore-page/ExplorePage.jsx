import LeftBar from "../navbar-components/LeftBar";
import RightBar from "../navbar-components/RightBar";
import NavBar from "../navbar-components/NavBar";
import "../../assets/styles/explorePage.scss";

export default function ExplorePage() {
    return (
        <div className="explore-main">
            <div className="explore-scroller">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <h2>Popular Today</h2>
                        <div className="sort">
                            <button>Sort By:</button>
                        </div>

                        <div className="exploreGrid">
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}